import { Container, Logo } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <Container>
      <Logo src={logo} alt="MyContacts" />
    </Container>
  );
}
