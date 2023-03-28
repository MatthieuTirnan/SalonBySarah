import '../../asset/style/home.scss'
import {Carousel} from "../../components/carousel-galerie";
import {LastArticle} from "../../components/last-article";

export const Home = () => {

    return (
        <main>
            <LastArticle/>
            <Carousel/>
            <section id="contact">
                <h2>CONTACT</h2>
                <div className='contact-wrapper'>
                    <a href="tel:00000000">téléphone : 00-00-00-00-00</a>
                    <a href="mailto:azerty@azerty.fr">mail : azerty@azerty.fr</a>
                    <p>20 Pl. de l'Église, 49250 Loire-Authion<br/></p>
                    <p>Une messagerie  de Contact est également disponible sur le site (nécessite d'être authentifié)</p>
                </div>
            </section>
        </main>
    )
}