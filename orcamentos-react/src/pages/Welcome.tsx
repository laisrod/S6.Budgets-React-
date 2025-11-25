import { Link } from 'react-router-dom'

export default function Welcome() {
    return(
        <div className="welcome">
            <h1>Bem vindo(a)!</h1>
            <p>
            Aqui você pode simular um orçamento de serviços digitais, como campanhas de SEO,
            anúncios e criação de website. Escolha o que precisa e veja o valor em tempo real.
            </p>

            <Link to="/app" className="btn">
                Ir para a calculadora
            </Link>
    </div>
  );
}