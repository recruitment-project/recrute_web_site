import React from 'react';
import './page_conseil.css';
import img1 from '../../assets/images_conseil/rec-distance.jpeg';
import img2 from '../../assets/images_conseil/competence2.png';
import img3 from '../../assets/images_conseil/re-entretien.jpg';
import img4 from '../../assets/images_conseil/postuler.jpg';
import img5 from '../../assets/images_conseil/stress.jpg';
import img6 from '../../assets/images_conseil/preparer.jpg';
import img7 from '../../assets/images_conseil/salaire.jpg';
import img8 from '../../assets/images_conseil/q-r.png';
import img9 from '../../assets/images_conseil/critere.jpeg';
import { Link } from 'react-router-dom';
function Pc1() {
 return (
      <div class="container mt-5" >

        <h1 class="pag-conseil mb-5">Conseils de recrutement</h1>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          
        <div class="col">
          <div class="card h-100"> 
            <Link to={'/page1'} >
            <img src={img1} className="card-img-top p-2" alt="postuler" /></Link>
              <div class="card-body">
              <Link to={'/page1'} class='des-link' >
                <h5 class="card-title">Comment récruter à distance ?</h5></Link>
                <p>En tant que recruteur, lorsque votre entreprise fait le choix de procéder au recrutement à distance, il vous faudra être bien informé sur le déroulement de ce dernier.</p>
              </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
          <Link to={'/page2'} >
          <img src={img2} className="card-img-top p-2" alt="preparer" />      
          </Link>
            <div class="card-body">
            <Link to={'/page2'} >
              <h5 class="card-title">Quelles compétences pour faire la différence demain ?</h5></Link>
              <p class="card-text">Les compétences du futur représentent l'ensemble des savoirs, savoir-faire et savoir-être qui seront nécessaires à la pratique de professions au cours des prochaines années.</p>
              
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100">
          <Link to={'/page3'} >
          <img src={img3} className="card-img-top p-2" alt="preparer" /> </Link>
            <div class="card-body">
            <Link to={'/page3'} >
              <h5 class="card-title">Réussir votre entretien</h5></Link>
              <p class="card-text">Vous avez décroché un entretien et après la joie, c'est le stress ! Pour ne pas paniquer, une seule solution : préparer cet entretien avec méthode. Il faut construire votre pitch, votre discours, et vous entraîner comme un sportif.</p>
            </div>
          </div>
        </div>
        
        <div class="col">
          <div class="card h-100">   
          <Link to={'/page4'} >
          <img src={img4} className="card-img-top p-2" alt="preparer" /> 
          </Link>
            <div class="card-body">
            <Link to={'/page4'} >
              <h5 class="card-title">Comment postuler efficacement ?</h5></Link>
              <p class="card-text">Pour augmenter vos chances d'être repéré par les recruteurs et décrocher un job, quelques mesures s'imposent. Évidemment, vous pensez tout de suite au CV et à la lettre de motivation. Indispensables, certes, mais pas suffisants pour obtenir un entretien d'embauche.</p>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100">
          <Link to={'/page5'} >
          <img src={img5} className="card-img-top p-2" alt="preparer" /> 
          </Link>
            <div class="card-body">
            <Link to={'/page5'} > 
              <h5 class="card-title">Comment gérer son stress avant un entretien d'embauche ?</h5></Link>
              <p class="card-text">Avec une crise sanitaire toujours en cours, les tendances resteront sensiblement les mêmes que l’année dernière. On observe toutefois de gros changements dans la gestion des recrutements au quotidien qui devront encore plus s’accentuer en 2022.
                </p>
              </div>
          </div>
        </div>



        <div class="col">
          <div class="card h-100">
          <Link to={'/page6'} >
          <img src={img6} className="card-img-top p-2" alt="preparer" /> 
          </Link>
            <div class="card-body">
            <Link to={'/page6'} >
              <h5 class="card-title">Préparer votre candidature</h5></Link>
              <p class="card-text">
              Rédiger mon C.V., ma lettre de motivation, prospecter les entreprises, réussir mon entretien d’embauche… La recherche d’une entreprise, ça se prépare !</p>
              </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100">
          <Link to={'/page7'} >
          <img src={img7} className="card-img-top p-2" alt="preparer" />     

            </Link>
            <div class="card-body">
            <Link to={'/page7'} >
              <h5 class="card-title">Négocier son premier salaire</h5></Link>
            <p> Il ne faut pas chercher à tout prix à se débarrasser de cette question, suggère l’expert. En parler, c’est déjà mettre de la valeur sur ses compétences ! Il est bon de donner un chiffre légèrement supérieur à son objectif pour garder une marge de manœuvre</p>
            </div>
          </div>
        </div>


        <div class="col">
          <div class="card h-100">
          <Link to={'/page8'} >
            <img src={img8} className="card-img-top p-2" alt="preparer" /> 
          </Link>
            <div class="card-body">
            <Link to={'/page8'} >
              <h5 class="card-title">Question reponse entretien d'embauche</h5></Link>
              <p class="card-text">Les questions posées par les recruteurs ont évidemment une raison d’être. Chaque réponse apportée par le candidat est une information supplémentaire obtenue par le recruteur. Il est évident que si tu n’es pas préparé à cet exercice, tu vas commettre des erreurs, sans forcément t’en rendre compte, et cela jouera en ta défaveur lors de l’entretien.</p>
                </div>
          </div>
        </div>



        <div class="col">
          <div class="card h-100">
            
          <Link to={'/page9'} >
          <img src={img9} className="card-img-top p-2" alt="preparer" /> 
          </Link>
            <div class="card-body">
            <Link to={'/page9'} >
              <h5 class="card-title">Quels sont les principaux critères à évaluer lors d’un recrutement ?</h5></Link>
              <p class="card-text">Les recruteurs sont de plus en plus frileux et difficiles à convaincre. Les candidats à l’embauche doivent répondre à certains critères pour attirer l’œil des recruteurs. Un chasseur de tête nous livre quelques clés pour mieux comprendre et anticiper ces processus à rallonge.
                </p>
              </div>
          </div>
        </div>
        
        </div>
      </div>
 
);
}

export default Pc1;