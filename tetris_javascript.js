let izabrani_blokovi_igra=[];
let izabrani_blokovi_igra_value=[];
let tezina_igre;
let celije=[];
let trenutni_polozaj
let broj_linija;
let score;
let nivo;
let slike_div;
let kraj_igre;
let trenutna_slika;
let sledeca_slika;
let celije_zauzete=[];
let stoperica;
let trenutna_slika_value;
let sledeca_slika_value;
let kraj_trenutnog_bloka;
let visina=20;
let sirina=10;
let trenutna_pozicija=[];
let pocetak=true;
let korisnicko_ime;
let nadjeni_redovi=[];
let korisnici=[];
let novi_niz_blokovi=[];
let trenutni_polozaj_bloka;
let polozaj;


function promenaBordera(klik)
{
    let slika = klik.target;
    if(slika.style.borderColor=="black" || slika.style.borderColor=="")
        slika.style.borderColor = 'red';
    else
        slika.style.borderColor = 'black';
}

function prelazakNaIgru()
{
    let slike = document.getElementsByTagName("img");
    let izabrani_blokovi=[];
    for (let index = 0; index < slike.length; index++) {
        let boja = slike[index].style.borderColor;
        let s = slike[index];
       if(boja=='red')
       {
            izabrani_blokovi.push(slike[index]);
       }

    }

    if(izabrani_blokovi.length==0)
    {
        alert("Niste izabrali nijedan blok probajte ponovo!");
    }
    else
    {
        izabrani_blokovi_igra=[];
        izabrani_blokovi_igra_value=[];
        for (let index = 0; index < izabrani_blokovi.length; index++) {
            izabrani_blokovi_igra.push(izabrani_blokovi[index].src);
            izabrani_blokovi_igra_value.push(izabrani_blokovi[index].alt);
        }

        tezina_igre = document.getElementById("tezina_biranje").value;
        if(tezina_igre=='lako')
        {
            tezina_igre=800;
        }
        else if(tezina_igre=='srednje')
        {
            tezina_igre=400;
        }
        else if(tezina_igre=='teško')
        {
            tezina_igre=200;
        }

        localStorage.setItem("tezina_igre",tezina_igre);
        localStorage.setItem("izabrani_blokovi_igra",JSON.stringify(izabrani_blokovi_igra));
        localStorage.setItem("izabrani_blokovi_igra_value",JSON.stringify(izabrani_blokovi_igra_value));
        window.location.href="tetris-igra.html";
    }
}

function postaviPocetakIgre()
{
    izabrani_blokovi_igra = JSON.parse(localStorage.getItem("izabrani_blokovi_igra"));
    tezina_igre = localStorage.getItem("tezina_igre");
    celije=document.getElementsByTagName("td");

    izabrani_blokovi_igra_value = JSON.parse(localStorage.getItem("izabrani_blokovi_igra_value"));

    broj_linija=0;
    score=0;

    celije_zauzete=[];

    for (let index = 0; index < celije.length; index++) {
        celije_zauzete.push(false);    
    }


    if(tezina_igre==800)
    {
        nivo=1;
    }
    else if(tezina_igre==400)
    {
        nivo=2;
    }
    else if(tezina_igre==200)
    {
        nivo=3;
    }

    let labela = document.getElementById("score_igra");
    labela.textContent  = "Score: "+score;
    labela = document.getElementById("nivo_igra");
    labela.textContent  = "Nivo: "+nivo;
    labela = document.getElementById("linije_igra");
    labela.textContent  = "Linije: "+broj_linija;
    

    slike_div = document.getElementById("slika_igra_blok");

   

    trenutna_slika = parseInt(Math.random()*izabrani_blokovi_igra.length);
    sledeca_slika = parseInt(Math.random()*izabrani_blokovi_igra.length);

    trenutna_slika_value = izabrani_blokovi_igra_value[trenutna_slika];
    sledeca_slika_value = izabrani_blokovi_igra_value[sledeca_slika];

    let slike_niz = document.getElementsByTagName("img");

    for (let index = 0; index < slike_niz.length; index++) {
        let a = slike_niz[index].alt;
        if(slike_niz[index].alt!=sledeca_slika_value)
        {
            slike_niz[index].style.display="none";
        }
    }

    kraj_igre=false;

    visina=20;
    sirina=10;

    if(window.location.href=="tetris-igra.html");

    document.body.addEventListener('keyup', pritisakTastera);

    igranjeIgre();
}

function izaberiBoju()
{
    let boja;
    switch(trenutna_slika_value)
    {
        case 'I_blok':
            boja="lightblue";
            break;
        case 'J_blok':
            boja="blue";
            break;
            case 'L_blok':
                boja="orange";
                break;
            case 'O_blok':
                boja="yellow";
                break;

            case 'S_blok':
                boja="green";
                break;   
                

            case 'T_blok':
                boja="purple";
                break;     
                
            case 'Z_blok':
                boja="red";
                break;                
    }
    return boja;
}

function pomeranjeRedova()
{
    for (let i = nadjeni_redovi.length-1; i>=0; i--) {
        let red = nadjeni_redovi[i];
        for (let j = red-1; j >= 0; j--) {
            if(j==0)
            {
                break;
            }
            if(nadjeni_redovi.includes(j))
            {
               let indeks_reda = nadjeni_redovi.indexOf(j);
               nadjeni_redovi[indeks_reda]++;
            }
            for (let index = 0; index < sirina; index++) {

                celije_zauzete[(j+1)*sirina+index] = celije_zauzete[j*sirina+index];
                celije[(j+1)*sirina+index].style.backgroundColor = celije[j*sirina+index].style.backgroundColor;
                celije[j*sirina+index].style.backgroundColor="inherit";
                celije_zauzete[j*sirina+index]=false;

            }
        }
    }

    let stari = parseInt(broj_linija/5);
    broj_linija+=nadjeni_redovi.length;
    let novi = parseInt(broj_linija/5);

    score+=nadjeni_redovi.length*10;

    if(broj_linija>0 && novi>stari)
    {
        nivo++;
        if(nivo==2)
        {
            tezina_igre=400;
        }
        else if(nivo==3)
        {
            tezina_igre=200;
        }
        else
        {
            tezina_igre=parseInt(tezina_igre*0.9);
        }
    }

    let labela = document.getElementById("score_igra");
    labela.textContent  = "Score: "+score;
    labela = document.getElementById("nivo_igra");
    labela.textContent  = "Nivo: "+nivo;
    labela = document.getElementById("linije_igra");
    labela.textContent  = "Linije: "+broj_linija;

    stoperica = setInterval(pomeranjeDole,tezina_igre);
}

function proveraLinijePopunjene()
{
    nadjeni_redovi=[];
    for (let i = 0; i < visina; i++) {
        let nadjen=false;
        for (let j = 0; j < sirina; j++) {
            if(celije_zauzete[i*sirina+j]==false)
            {
                nadjen=true;break;
            }
        }
        if(!nadjen)
        {
            nadjeni_redovi.push(i);
            for (let j = 0; j < sirina; j++) {
                celije_zauzete[i*sirina+j]=false;
                celije[i*sirina+j].style.backgroundColor="white";
            }
        }
    }

    if (nadjeni_redovi.length>0)
    {
        setTimeout(pomeranjeRedova,500);
    }
    else
    {
        stoperica = setInterval(pomeranjeDole,tezina_igre);
    }

}

function pritisakTastera(event)
{
    if(pocetak)return;
    let k = event.key;
    if(event.key=='S' || event.key=='ArrowDown' || event.key=='s')
    {
        pomeranjeDole();
    }
    else if(event.key=='A' || event.key=='ArrowLeft' || event.key=='a')
    {
        pomeranjeLevo();
    }
    else if(event.key=='D' || event.key=='ArrowRight' || event.key=='d')
    {
        pomeranjeDesno();
    }
    else if(event.key=='W' || event.key=='ArrowUp' || event.key=='w')
    {
        pomeranjeRotacija();
    }
}

function pomeranjeDole()
{   
    if(pocetak==true)
    {
        iscrtajFiguruPocetno();
        pocetak=false;
        polozaj=0;
    }
    else
    {
        let dozvola=true;
        for (let index = 0; index < trenutna_pozicija.length; index++) {
            let pozicija = trenutna_pozicija[index];
            if(Math.floor(trenutna_pozicija[index]/10)==19)
            {
                dozvola=false;break;
            }
            else if(celije_zauzete[pozicija+10] && !trenutna_pozicija.includes(pozicija+10))
            {
                dozvola=false;break;
            }
        }
        if(dozvola)
        {
            for (let index = 0; index < trenutna_pozicija.length; index++) {
                let pozicija = trenutna_pozicija[index];
                celije[pozicija].style.backgroundColor="inherit";  
                celije_zauzete[pozicija]=false;
            }
            let boja = izaberiBoju();
            for (let index = 0; index < trenutna_pozicija.length; index++) {
                trenutna_pozicija[index]=trenutna_pozicija[index]+10;
                let pozicija = trenutna_pozicija[index];
                celije[pozicija].style.backgroundColor=boja;  
                celije_zauzete[pozicija]=true;
            }

            //Proba za kraj
            for (let index = 0; index < trenutna_pozicija.length; index++) {
                let pozicija = trenutna_pozicija[index];
                if(Math.floor(trenutna_pozicija[index]/10)==19)
                {
                    dozvola=false;break;
                }
                else if(celije_zauzete[pozicija+10] && !trenutna_pozicija.includes(pozicija+10))
                {
                    dozvola=false;break;
                }
            }




        }
        if (dozvola==false)
        {
            kraj_trenutnog_bloka=false;
            clearInterval(stoperica);
            trenutna_slika=sledeca_slika;
            trenutna_slika_value=sledeca_slika_value;
            sledeca_slika = parseInt(Math.random()*izabrani_blokovi_igra.length);
            sledeca_slika_value = izabrani_blokovi_igra_value[sledeca_slika];
            pocetak=true;
            
            let slike_niz = document.getElementsByTagName("img");

            for (let index = 0; index < slike_niz.length; index++) {
                let a = slike_niz[index].alt;
                if(slike_niz[index].alt!=sledeca_slika_value)
                {
                    slike_niz[index].style.display="none";
                }
                else
                {
                    slike_niz[index].style.display="block";
                }
            }

            //Napisati sve one provere za redove nivoe itd...
            //Proveri novu tezinu igre - isto funkcija, ako smo zaredjali 5 redova jedan za drugim

            proveraLinijePopunjene();
            

        }
    }
}

function iscrtajNoviRotacija()
{
    let bo = izaberiBoju();
    for (let index = 0; index < 4; index++) 
    {
       celije_zauzete[trenutna_pozicija[index]]=false;
       celije[trenutna_pozicija[index]].style.backgroundColor="inherit";
    }

    for (let index = 0; index < 4; index++) {
        trenutna_pozicija[index]=novi_niz_blokovi[index];
        celije_zauzete[trenutna_pozicija[index]]=true;
        celije[trenutna_pozicija[index]].style.backgroundColor=bo;
        
    }
}

function proveraSudariDrugiBlokovi()
{
    let n =false;
    for (let index = 0; index < novi_niz_blokovi.length; index++) 
    {
        if(celije_zauzete[novi_niz_blokovi[index]] && !trenutna_pozicija.includes(novi_niz_blokovi[index]))
        {
            n=true;
            break;
        }
    }
    return n;
}

function rotacijaIblok()
{

    novi_niz_blokovi =[];
    for (let index = 0; index < trenutna_pozicija.length; index++) 
    {
        novi_niz_blokovi.push(trenutna_pozicija[index]);
    }
    let zabrana=false;
    if(polozaj==0)
    {
        if(Math.floor(trenutna_pozicija[0]/10)==0 || Math.floor(trenutna_pozicija[0]/10)==18 || Math.floor(trenutna_pozicija[0]/10)==19)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]-=9;
            novi_niz_blokovi[2]+=9;
            novi_niz_blokovi[3]+=18;
        }
    }
    else
    {   
        if(trenutna_pozicija[0]%10==0 || trenutna_pozicija[0]%10==8 || trenutna_pozicija[0]%10==9)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]+=9;
            novi_niz_blokovi[2]-=9;
            novi_niz_blokovi[3]-=18;
        }
    }

    if(!zabrana)
    {
       if(celije_zauzete[novi_niz_blokovi[0]] || celije_zauzete[novi_niz_blokovi[2]] || celije_zauzete[novi_niz_blokovi[3]])
       {
            zabrana=true;
       }
    }

    if(!zabrana)
    {
        polozaj++;
        polozaj=polozaj%2;
        iscrtajNoviRotacija();
    }

}

function rotacijaSblok()
{
    novi_niz_blokovi =[];
    for (let index = 0; index < trenutna_pozicija.length; index++) 
    {
        novi_niz_blokovi.push(trenutna_pozicija[index]);
    }
    let zabrana=false;

    if(polozaj==0)
    {
        if(Math.floor(trenutna_pozicija[2]/10)==19)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[2]-=9;
            novi_niz_blokovi[0]+=11;
            novi_niz_blokovi[1]+=20;
        }
    }
    else
    {   
        if(trenutna_pozicija[2]%10==0)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[2]+=9;
            novi_niz_blokovi[0]-=11;
            novi_niz_blokovi[1]-=20;
        }
    }

    if(!zabrana)
    {
       zabrana=proveraSudariDrugiBlokovi();
    }

    if(!zabrana)
    {
        polozaj++;
        polozaj=polozaj%2;
        iscrtajNoviRotacija();
    }
}

function rotacijaZblok()
{
    novi_niz_blokovi =[];
    for (let index = 0; index < trenutna_pozicija.length; index++) 
    {
        novi_niz_blokovi.push(trenutna_pozicija[index]);
    }
    let zabrana=false;

    if(polozaj==0)
    {
        if(Math.floor(trenutna_pozicija[0]/10)==0)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]-=9;
            novi_niz_blokovi[2]-=11;
            novi_niz_blokovi[3]-=2;
        }
    }
    else
    {   
        if(trenutna_pozicija[0]%10==9)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]+=9;
            novi_niz_blokovi[2]+=11;
            novi_niz_blokovi[3]+=2;
        }
    }

    if(!zabrana)
    {
       zabrana=proveraSudariDrugiBlokovi();
    }

    if(!zabrana)
    {
        polozaj++;
        polozaj=polozaj%2;
        iscrtajNoviRotacija();
    }
}


function rotacijaTblok()
{
    novi_niz_blokovi =[];
    for (let index = 0; index < trenutna_pozicija.length; index++) 
    {
        novi_niz_blokovi.push(trenutna_pozicija[index]);
    }
    let zabrana=false;

    if(polozaj==0)
    {
        if(Math.floor(trenutna_pozicija[1]/10)==19)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]+=11;
            novi_niz_blokovi[1]-=9;
            novi_niz_blokovi[3]+=9;
        }
    }
    else if(polozaj==1)
    {   
        if(trenutna_pozicija[1]%10==0)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]+=9;
            novi_niz_blokovi[1]+=11;
            novi_niz_blokovi[3]-=11;
        }
    }
    else if(polozaj==2)
    {   
        if(Math.floor(trenutna_pozicija[1]/10)==0)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]-=11;
            novi_niz_blokovi[1]+=9;
            novi_niz_blokovi[3]-=9;
        }
    }
    else
    {
        if(trenutna_pozicija[1]%10==9)
            {
                zabrana=true;
            }
            else
            {
                novi_niz_blokovi[0]-=9;
                novi_niz_blokovi[1]-=11;
                novi_niz_blokovi[3]+=11;
            }        
    }

    if(!zabrana)
    {
       zabrana=proveraSudariDrugiBlokovi();
    }

    if(!zabrana)
    {
        polozaj++;
        polozaj=polozaj%4
        iscrtajNoviRotacija();
    }   
}

function rotacijaJblok()
{
    novi_niz_blokovi =[];
    for (let index = 0; index < trenutna_pozicija.length; index++) 
    {
        novi_niz_blokovi.push(trenutna_pozicija[index]);
    }
    let zabrana=false;

    if(polozaj==0)
    {
        if(Math.floor(trenutna_pozicija[1]/10)==19)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]+=2;
            novi_niz_blokovi[1]-=9;
            novi_niz_blokovi[3]+=9;
        }
    }
    else if(polozaj==1)
    {   
        if(trenutna_pozicija[1]%10==0)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]+=20;
            novi_niz_blokovi[1]+=11;
            novi_niz_blokovi[3]-=11;
        }
    }
    else if(polozaj==2)
    {   
        if(Math.floor(trenutna_pozicija[1]/10)==0)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]-=2;
            novi_niz_blokovi[1]+=9;
            novi_niz_blokovi[3]-=9;
        }
    }
    else
    {
        if(trenutna_pozicija[1]%10==9)
            {
                zabrana=true;
            }
            else
            {
                novi_niz_blokovi[0]-=20;
                novi_niz_blokovi[1]-=11;
                novi_niz_blokovi[3]+=11;
            }        
    }

    if(!zabrana)
    {
       zabrana=proveraSudariDrugiBlokovi();
    }

    if(!zabrana)
    {
        polozaj++;
        polozaj=polozaj%4
        iscrtajNoviRotacija();
    }   
}

function rotacijaLblok()
{
    novi_niz_blokovi =[];
    for (let index = 0; index < trenutna_pozicija.length; index++) 
    {
        novi_niz_blokovi.push(trenutna_pozicija[index]);
    }
    let zabrana=false;

    if(polozaj==0)
    {
        if(Math.floor(trenutna_pozicija[1]/10)==19)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]+=20;
            novi_niz_blokovi[1]-=9;
            novi_niz_blokovi[3]+=9;
        }
    }
    else if(polozaj==1)
    {   
        if(trenutna_pozicija[1]%10==0)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]-=2;
            novi_niz_blokovi[1]+=11;
            novi_niz_blokovi[3]-=11;
        }
    }
    else if(polozaj==2)
    {   
        if(Math.floor(trenutna_pozicija[1]/10)==0)
        {
            zabrana=true;
        }
        else
        {
            novi_niz_blokovi[0]-=20;
            novi_niz_blokovi[1]+=9;
            novi_niz_blokovi[3]-=9;
        }
    }
    else
    {
        if(trenutna_pozicija[1]%10==9)
            {
                zabrana=true;
            }
            else
            {
                novi_niz_blokovi[0]+=2;
                novi_niz_blokovi[1]-=11;
                novi_niz_blokovi[3]+=11;
            }        
    }

    if(!zabrana)
    {
       zabrana=proveraSudariDrugiBlokovi();
    }

    if(!zabrana)
    {
        polozaj++;
        polozaj=polozaj%4
        iscrtajNoviRotacija();
    }   
}

function pomeranjeRotacija()
{
    if(trenutna_slika_value=='O_blok')
    {
        return;
    }
    else if(trenutna_slika_value == 'I_blok')
    {
        rotacijaIblok();
    }
    else if(trenutna_slika_value == 'S_blok')
    {
        rotacijaSblok();
    }
    else if(trenutna_slika_value == 'Z_blok')
    {
        rotacijaZblok();
    }
    else if(trenutna_slika_value == 'T_blok')
    {
        rotacijaTblok();
    }
    else if(trenutna_slika_value == 'J_blok')
    {
        rotacijaJblok();
    }
    else if(trenutna_slika_value == 'L_blok')
    {
        rotacijaLblok();
    }

}

function pomeranjeLevo()
{
    let dozvola=true;
    for (let index = 0; index < trenutna_pozicija.length; index++) {
        let pozicija = trenutna_pozicija[index];
        if(trenutna_pozicija[index]%10==0)
        {
            dozvola=false;break;
        }
        else if(celije_zauzete[pozicija-1] && !trenutna_pozicija.includes(pozicija-1))
        {
            dozvola=false;break;
        }
    }
    if(dozvola)
    {
        for (let index = 0; index < trenutna_pozicija.length; index++) {
            let pozicija = trenutna_pozicija[index];
            celije[pozicija].style.backgroundColor="inherit";
            celije_zauzete[pozicija]=false;  
        }
        let boja = izaberiBoju();
        for (let index = 0; index < trenutna_pozicija.length; index++) {
            trenutna_pozicija[index]=trenutna_pozicija[index]-1;
            let pozicija = trenutna_pozicija[index];
            celije[pozicija].style.backgroundColor=boja;  
            celije_zauzete[pozicija]=true; 
        }
    }

}

function pomeranjeDesno()
{
    let dozvola=true;
    for (let index = 0; index < trenutna_pozicija.length; index++) {
        let pozicija = trenutna_pozicija[index];
        if(trenutna_pozicija[index]%10==9)
        {
            dozvola=false;break;
        }
        else if(celije_zauzete[pozicija+1] && !trenutna_pozicija.includes(pozicija+1))
        {
            dozvola=false;break;
        }
    }
    if(dozvola)
    {
        for (let index = 0; index < trenutna_pozicija.length; index++) {
            let pozicija = trenutna_pozicija[index];
            celije[pozicija].style.backgroundColor="inherit"; 
            celije_zauzete[pozicija]=false; 
        }
        let boja = izaberiBoju();
        for (let index = 0; index < trenutna_pozicija.length; index++) {
            trenutna_pozicija[index]=trenutna_pozicija[index]+1;
            let pozicija = trenutna_pozicija[index];
            celije[pozicija].style.backgroundColor=boja;  
            celije_zauzete[pozicija]=true;
        }
    }
}


function provera_dupliranja_imena()
{
    let provera=false;
    for (let index = 0; index < korisnici.length; index++) {
        if(korisnici[index].ime==korisnicko_ime)
        {
            provera=true;
            break;
        }
    }
    return provera;
}

function iscrtajFiguruPocetno()
{
    switch(trenutna_slika_value)
    {
        case 'I_blok':
            if(celije_zauzete[3] || celije_zauzete[4] || celije_zauzete[5] || celije_zauzete[6])
            {
                kraj_igre=true;
                kraj_trenutnog_bloka=true;
            }
            else
            {
                celije_zauzete[3]=true;
                celije_zauzete[4]=true;
                celije_zauzete[5]=true;
                celije_zauzete[6]=true;
                celije[3].style.backgroundColor ="lightblue";
                celije[4].style.backgroundColor ="lightblue";
                celije[5].style.backgroundColor ="lightblue";
                celije[6].style.backgroundColor ="lightblue";
                trenutna_pozicija[0]=3;
                trenutna_pozicija[1]=4;
                trenutna_pozicija[2]=5;
                trenutna_pozicija[3]=6;
            }
            break;
        case 'J_blok':
            if(celije_zauzete[4] || celije_zauzete[14] || celije_zauzete[15] || celije_zauzete[16])
            {
                kraj_igre=true;
                kraj_trenutnog_bloka=true;
            }
            else
            {
                celije_zauzete[4]=true;
                celije_zauzete[14]=true;
                celije_zauzete[15]=true;
                celije_zauzete[16]=true;
                celije[4].style.backgroundColor ="blue";
                celije[14].style.backgroundColor ="blue";
                celije[15].style.backgroundColor ="blue";
                celije[16].style.backgroundColor ="blue";
                trenutna_pozicija[0]=4;
                trenutna_pozicija[1]=14;
                trenutna_pozicija[2]=15;
                trenutna_pozicija[3]=16;
            }
            break;
            case 'L_blok':
                if(celije_zauzete[6] || celije_zauzete[14] || celije_zauzete[15] || celije_zauzete[16])
                {
                    kraj_igre=true;
                    kraj_trenutnog_bloka=true;
                }
                else
                {
                    celije_zauzete[6]=true;
                    celije_zauzete[14]=true;
                    celije_zauzete[15]=true;
                    celije_zauzete[16]=true;
                    celije[6].style.backgroundColor ="orange";
                    celije[14].style.backgroundColor ="orange";
                    celije[15].style.backgroundColor ="orange";
                    celije[16].style.backgroundColor ="orange";
                    trenutna_pozicija[0]=6;
                    trenutna_pozicija[1]=14;
                    trenutna_pozicija[2]=15;
                    trenutna_pozicija[3]=16;
                }
                break;
            case 'O_blok':
                if(celije_zauzete[5] || celije_zauzete[6] || celije_zauzete[15] || celije_zauzete[16])
                {
                    kraj_igre=true;
                    kraj_trenutnog_bloka=true;
                }
                else
                {
                    celije_zauzete[5]=true;
                    celije_zauzete[6]=true;
                    celije_zauzete[15]=true;
                    celije_zauzete[16]=true;
                    celije[5].style.backgroundColor ="yellow";
                    celije[6].style.backgroundColor ="yellow";
                    celije[15].style.backgroundColor ="yellow";
                    celije[16].style.backgroundColor ="yellow";
                    trenutna_pozicija[0]=5;
                    trenutna_pozicija[1]=6;
                    trenutna_pozicija[2]=15;
                    trenutna_pozicija[3]=16;
                }
                break;

            case 'S_blok':
                if(celije_zauzete[5] || celije_zauzete[6] || celije_zauzete[14] || celije_zauzete[15])
                {
                    kraj_igre=true;
                    kraj_trenutnog_bloka=true;
                }
                else
                {
                    celije_zauzete[5]=true;
                    celije_zauzete[6]=true;
                    celije_zauzete[14]=true;
                    celije_zauzete[15]=true;
                    celije[5].style.backgroundColor ="green";
                    celije[6].style.backgroundColor ="green";
                    celije[14].style.backgroundColor ="green";
                    celije[15].style.backgroundColor ="green";
                    trenutna_pozicija[0]=5;
                    trenutna_pozicija[1]=6;
                    trenutna_pozicija[2]=14;
                    trenutna_pozicija[3]=15;
                }
                break;   
                

            case 'T_blok':
                if(celije_zauzete[5] || celije_zauzete[14] || celije_zauzete[15] || celije_zauzete[16])
                {
                    kraj_igre=true;
                    kraj_trenutnog_bloka=true;
                }
                else
                {
                    celije_zauzete[5]=true;
                    celije_zauzete[14]=true;
                    celije_zauzete[15]=true;
                    celije_zauzete[16]=true;
                    celije[5].style.backgroundColor ="purple";
                    celije[14].style.backgroundColor ="purple";
                    celije[15].style.backgroundColor ="purple";
                    celije[16].style.backgroundColor ="purple";
                    trenutna_pozicija[0]=5;
                    trenutna_pozicija[1]=14;
                    trenutna_pozicija[2]=15;
                    trenutna_pozicija[3]=16;
                }
                break;     
                
            case 'Z_blok':
                if(celije_zauzete[4] || celije_zauzete[5] || celije_zauzete[15] || celije_zauzete[16])
                {
                    kraj_igre=true;
                    kraj_trenutnog_bloka=true;
                }
                else
                {
                    celije_zauzete[4]=true;
                    celije_zauzete[5]=true;
                    celije_zauzete[15]=true;
                    celije_zauzete[16]=true;
                    celije[4].style.backgroundColor ="red";
                    celije[5].style.backgroundColor ="red";
                    celije[15].style.backgroundColor ="red";
                    celije[16].style.backgroundColor ="red";
                    trenutna_pozicija[0]=4;
                    trenutna_pozicija[1]=5;
                    trenutna_pozicija[2]=15;
                    trenutna_pozicija[3]=16;
                }
                break;                
    }
    if(kraj_igre)
    {
        kraj_igre=true;
        clearInterval(stoperica);
        korisnicko_ime=""

        if(localStorage.getItem("korisnici")!=null)
        {
            korisnici=JSON.parse(localStorage.getItem("korisnici"));
        }
        else
        {
            korisnici=[];
            localStorage.setItem("korisnici",JSON.stringify(korisnici));
        }


        while(korisnicko_ime=="" || korisnicko_ime=='none' || korisnicko_ime==null)
        {
            korisnicko_ime = prompt("Unesite korisnicko ime pod kojim zelite da se pamti score");
            let provera = provera_dupliranja_imena();
            if(provera)
            {
                korisnicko_ime="";
                alert("Ovo ime vec postoji");
            }
            if(korisnicko_ime==null ||korisnicko_ime=="" )
            {
                alert("Morate uneti ispravno korisnicko ime");
            }
        }

        let korisnik = {ime:korisnicko_ime,bodovi:score};
        korisnici.push(korisnik);
        localStorage.setItem("korisnici",JSON.stringify(korisnici));
        window.location.href="tetris-rezultati.html"

    }
}

function igranjeIgre()
{
    trenutni_polozaj_bloka=0;
    trenutna_pozicija=[];
    kraj_trenutnog_bloka = false;
    pocetak=true;

    stoperica = setInterval(pomeranjeDole,tezina_igre);

}

function sortirajKorisnike(korisnikA,korisnikB)
{
    return parseInt(korisnikB.bodovi) - parseInt(korisnikA.bodovi);
}


function postavljanjeTableRezultata()
{
    if(localStorage.getItem("korisnici")!=null)
    {
        korisnici=JSON.parse(localStorage.getItem("korisnici"));
    }
    else
    {
        korisnici=[];
        localStorage.setItem("korisnici",JSON.stringify(korisnici));
    }
    if(korisnici.length>0)
    {
        let poeni_poslednji = korisnici[korisnici.length-1].bodovi;
        let ime_poslednji = korisnici[korisnici.length-1].ime;

        let celija_poslednji = document.getElementById("tabla_poslednja_igra").querySelector("td").textContent=ime_poslednji+" je osvojio "+poeni_poslednji +" bodova"

        korisnici.sort(sortirajKorisnike);

        let duzina= korisnici.length;
        //if(duzina>5){duzina=5;}

        let tabla = document.getElementById("tabla_korisnici_rezultati");

        celije_korisnici_lista = document.getElementById("tabla_korisnici_rezultati").querySelectorAll("td");

        for (let index = 0; index < duzina; index++) {
            let korisnik = korisnici[index];

            let red = document.createElement("tr");
            let celija = document.createElement("td");
            celija.classList.add("rezultat_celije");
            celija.textContent=index+1;
            red.append(celija);

            celija = document.createElement("td");
            celija.classList.add("rezultat_celije");
            celija.textContent=korisnik.ime;
            red.append(celija);

            celija = document.createElement("td");
            celija.classList.add("rezultat_celije");
            celija.textContent=korisnik.bodovi;
            red.append(celija);
            
            tabla.append(red);


            //celije_korisnici_lista[index*3+3].textContent=index+1;
           // celije_korisnici_lista[index*3+1+3].textContent=korisnik.ime;
            //celije_korisnici_lista[index*3+2+3].textContent=korisnik.bodovi;
        }
    }

}

function prelazakNaListu()
{
    window.location.href="tetris-rezultati.html";
}

function povratakPocetna()
{
    window.location.href="tetris-uputstvo.html";
}


