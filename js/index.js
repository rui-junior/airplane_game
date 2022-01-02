

    function criaDiv(classe)
    {

        const elemento = document.createElement("div")
        elemento.className = classe

        return elemento

    }


    function Aviao(larguradatela)
    {

        this.aviao = criaDiv("aviao")

        this.posicaoYaviao = this.aviao.getBoundingClientRect();
        this.posicaoaviao = () => parseInt(this.aviao.style.left.split('px')[0])
        //console.log(this.posicaoaviao.x)
        this.setposicao = x => this.aviao.style.left = `${x}px`

        this.setposicao(larguradatela/2)

        window.addEventListener('keydown', (event) => {

            switch (event.code) {

                case 'ArrowRight':
                    this.vaiparadireita()                    
                    break;

                case 'ArrowLeft':
                    this.vaipraesquerda()
                    break;
            
                default:
                    break;

            }
            
        });

        this.vaiparadireita = () => {

            let posicaoatual = this.posicaoaviao() + 25

            if(posicaoatual >= larguradatela){

                this.setposicao(larguradatela - this.aviao.clientWidth)

            } else {

                this.setposicao(posicaoatual)

            }

        }

        this.vaipraesquerda = () => {

            let posicaoatual = this.posicaoaviao() - 25

            if(posicaoatual <= 0) {

                this.setposicao(0 + this.aviao.clientWidth)

            } else {

                //setInterval(this.setposicao(posicaoatual) , 5)
                this.setposicao(posicaoatual)

            }

        }

    }


    function CriaNuvem(larguradatela, alturadatela){

        this.nuvem = criaDiv("nuvem") 
        
        //const tamanhodanuvem = Math.random().toFixed(1) * (larguradatela * 0.4).toFixed()
        this.tamanhodanuvem = Math.random().toFixed(1) * ((larguradatela * 0.4).toFixed() - 50) + 50

        this.x = Math.random().toFixed(2) * (larguradatela - this.tamanhodanuvem).toFixed()

        this.y = Math.random().toFixed(2) * ((alturadatela * 0.4) - (-50)) + (-50)
        // valor maximo alturadatela * 0.3 / valor minimo -50

        this.setTamanho = randomico => this.nuvem.style.width = `${randomico}px`
        this.setX = xis => this.nuvem.style.left = `${xis}px`
        this.setY = ips => this.nuvem.style.top = `${ips}px`

        this.getY = () => this.nuvem.getBoundingClientRect()

        //console.log(tamanhodanuvem)

        this.setTamanho(this.tamanhodanuvem)
        this.setX(this.x)
        this.setY(this.y)

    }




    function Nuvens(larguradatela, alturadatela){

        this.conjuto = [

            new CriaNuvem(larguradatela, alturadatela),
            new CriaNuvem(larguradatela, alturadatela),
            new CriaNuvem(larguradatela, alturadatela),
            new CriaNuvem(larguradatela, alturadatela)

        ]

        const deslocamento = 1

        this.animar = () => {

            this.conjuto.forEach(function (item, indice, array){

                item.setY(item.getY().y + deslocamento)

                if(item.getY().y >= alturadatela){

                    array.splice(indice, 1, new CriaNuvem(larguradatela, alturadatela))

                }

                //console.log(aviao.posicaoaviao())
                
            })
            
        }

    }

    function colidiu(aviao, nuvem, alturadatela){

        let colidiu = false

        let xAviao = aviao.posicaoaviao

        nuvem.conjuto.forEach( function(item, indice, array){

            let minimo = (item.getY().x).toFixed()
            let maximo = parseInt(item.tamanhodanuvem) + parseInt(minimo)

            if((item.getY().y + 40).toFixed() == (alturadatela * 0.7).toFixed()){

                if(xAviao() > minimo && xAviao() < maximo){

                    colidiu = true

                } 

            }

        })

        return colidiu
        
    }


    function Start(){

        const ceu = document.querySelector("[ceu]")

        const aviao = new Aviao(ceu.clientWidth)
        const nuvem = new Nuvens(ceu.clientWidth, ceu.clientHeight)
        
        ceu.appendChild(aviao.aviao)

        const temporizador = setInterval(() => {
            
            nuvem.conjuto.forEach(par => ceu.appendChild(par.nuvem))
            nuvem.animar()

            if(colidiu(aviao, nuvem, ceu.clientHeight)){
                clearInterval(temporizador)
                
            }

        }, 10);

    }

    Start()




    















    
