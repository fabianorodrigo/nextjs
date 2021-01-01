import useSWR from 'swr';

import React from 'react';
import {FormControl, Grid, InputLabel, Select, TextField} from '@material-ui/core';

export default function ClientSide({deputados}) {
    return <Grid container>{Deputados()}</Grid>;
}

const URLDeputados = 'https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=RJ&ordem=ASC&ordenarPor=nome';

function Deputados() {
    const {data, error} = useSWR(URLDeputados, getData);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return data.map((d) => {
        return (
            <Grid item xs={6} key={`gridItemFiltro${d.nome}`}>
                {d.nome} ({d.siglaPartido})
            </Grid>
        );
    });
}

async function getData() {
    const response = await fetch(URLDeputados, {
        headers: {
            accept: 'application/json',
        },
    });
    return (await response.json()).dados;
}
