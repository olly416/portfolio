document.addEventListener('DOMContentLoaded',function(){
    const header = document.querySelector('header');
    const navList = header.querySelectorAll('nav ul li');
    const frame = document.querySelector('.frame');
    const twinkling = document.querySelector('.twinkling');
    const shapes = document.querySelectorAll('.shape');  
    const spell1 = document.querySelector('.spell1');
    const spell2 = document.querySelector('.spell2');
    const spell3 = document.querySelector('.spell3');
    const spell4 = document.querySelector('.spell4');    
    const Sections = document.querySelectorAll('section');
    const Container = document.querySelectorAll('.container');    
    const duckimg = document.querySelector('.magicBox .duckimg');
    const magicDuck = document.querySelector('.magicDuck');
    const clickSpell = document.querySelector('.clickspell');
    // const positionValue = frame.style.position;
    let MainHeight;
    let ScrollPercent;
    let scrollY;
    scrollY = window.scrollY;


    sectionDetector();
    ShapeControl();


    // 스크롤하면 현재 스크롤 값 계산해서 넘기기
    window.addEventListener('scroll',function(){
        scrollY = window.scrollY;
        ShapeControl();
        UpOutHeaderSection(400);
        sectionDetector();
    });

    // 메뉴 누르면 해당 섹션으로 이동하기
    navList.forEach(function(item,index){                
        item.addEventListener('click',function(){
            const targetMenu = this.getAttribute('data-value');
            const MobileaboutOst = 22 * MainHeight /100;
            const MobileworkOst = 48 * MainHeight /100;
            const MobilecontactOst = 75 * MainHeight /100;
            let ContainersOst = [];
            
            Container.forEach(function(item,idx){
                ContainersOst.push(item.offsetTop)
            });

            if(ViewportDetect()){
                if(targetMenu == 'aboutme'){ 
                    sectionMoving(MobileaboutOst);
                }else if(targetMenu == 'work'){
                    sectionMoving(MobileworkOst);
                }else{
                    sectionMoving(MobilecontactOst);
                }
            }else{
                if(targetMenu == 'home'){
                    sectionMoving(ContainersOst[0]); 
                }else if(targetMenu == 'aboutme'){ 
                    sectionMoving(ContainersOst[1]); 
                }else if(targetMenu == 'work'){
                    sectionMoving(ContainersOst[2]);
                }else{
                    sectionMoving(ContainersOst[3]);
                }
            }
        });
    });
    
    // 함수 :: 부드럽게 섹션 이동
    function sectionMoving(targetSection){
        $('html').animate({
            scrollTop: targetSection           
        }, 400);
    }

    // 함수 :: viewport 감지
    function ViewportDetect(){
        return window.innerWidth <= 475;
    }
    
    // 475px 기준으로 각종 함수 작동하기
    if(ViewportDetect()){
        UpOutHeaderSection(200);
        FramePosition(500);
    }else{
        UpOutHeaderSection(700);
        FramePosition(1000);
    }

    // 함수 :: ShapeDiv 이동 & 일정 스크롤 값 이상이면 frame 보이지 않음
    function ShapeControl(){
        scrollY = window.scrollY;
        if(scrollY <= 700){            
            shapes[0].style.left = -scrollY * 2 + 'px';
            shapes[1].style.left =  scrollY * 1.3 + 'px';
            shapes[2].style.left = -scrollY * 1.8 + 'px';
            frame.style.opacity=1;
        }else{
            frame.style.opacity=0;
        }
    }

    // 함수 :: 스크롤 값 따라서 Frame의 포지션 변경
    function FramePosition(scrollVal){
        if( scrollY <= scrollVal){
            frame.style.position = "static";   
        }else{
            frame.style.position = "fixed";        
        }
    }
    
    
    // 함수 :: 현재 스크롤 퍼센트 맞춰 section의 위치 감지, 배경효과
    function sectionDetector(){
        MainHeight = document.querySelector('main').offsetHeight;
        ScrollPercent = Math.floor(scrollY/MainHeight*100);
        if(ScrollPercent >= 0 && ScrollPercent <= 20){
            removeHover();
            navList[0].classList.add('hover');
        }else if( ScrollPercent > 20 && ScrollPercent < 47 ){
            removeHover();
            navList[1].classList.add('hover');
            Sections[1].classList.add('linearBG');
        }else if(ScrollPercent >= 47 && ScrollPercent <= 74){
            removeHover();
            navList[2].classList.add('hover');
            Sections[2].classList.add('linearBG');
        }else if(ScrollPercent > 74 && ScrollPercent <= 100){
            removeHover();
            navList[3].classList.add('hover');
            Sections[3].classList.add('linearBG');
        }
    }
        
    function removeHover(){
        navList.forEach(function(item){
            item.classList.remove('hover');
        });               
    }

    // 함수 :: 스크롤하면 Header, Section 차례대로 나타나기
    function UpOutHeaderSection(val){
        if( scrollY < val){
            Sections[1].classList.remove('fadeUp');
            header.classList.remove('fadeIn');            
        }else{
            Sections[1].classList.add('fadeUp');
            header.classList.add('fadeIn');
        }
    }

    // 각각 Spell 클릭하면 해당 내용 반영해서 오리 변경하기
    spell1.addEventListener('click',function(){
        SpellClick('spell1','작아지기');
    });   
    spell2.addEventListener('click',function(){
        SpellClick('spell2','커지기');
    });
    spell3.addEventListener('click',function(){
        magicDuck.style.opacity = 0;
        SpellClick('spell3','사라지기');
    });
    spell4.addEventListener('click',function(){
        SpellClick('spell4','원래대로');    
    });
    function SpellClick(spellClass, spellTxt){
        removeSpell();
        magicDuck.classList.add(spellClass);
        clickSpell.textContent = spellTxt;
        PauseDuck();
    }

      //  함수 ::  기존 주문제거, 오리 멈추기
    function removeSpell(){
        magicDuck.classList.remove('spell1','spell2','spell3','spell4');
    }
    function PauseDuck(){
        duckimg.classList.add('stopDuck');
        setTimeout(function(){
            duckimg.classList.remove('stopDuck');
        },8000);
        magicDuck.style.opacity = 1;
    }
});