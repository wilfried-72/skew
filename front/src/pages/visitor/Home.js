import React from 'react';
import VisiteurLayout from 'layouts/VisiteurLayout';
import CardHome from 'components/visiteur/CardHome';
import WhyHome from 'components/visiteur/WhyHome';
import StatBarHome from 'components/visiteur/StatBarHome';

export default function Home() {
    return (
        <VisiteurLayout>
            <CardHome />
            <WhyHome />
            <StatBarHome />
        </VisiteurLayout>
    );
};