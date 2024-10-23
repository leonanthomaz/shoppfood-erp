import { ReactNode } from 'react';
import { Container } from '@mui/material';
import Navbar from '../Navbar';
import { LayoutContainer, MainContent } from './MainLayoutStyles';

interface LayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <LayoutContainer>
            <Navbar />
            <Container maxWidth="lg" sx={{ flexGrow: 1, paddingY: 12 }}>
                <MainContent>
                    {children}
                </MainContent>
            </Container>
        </LayoutContainer>
    );
};

export default MainLayout;
