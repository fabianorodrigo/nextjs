import React from 'react';
import {FormControl, Grid, InputLabel, Select, TextField} from '@material-ui/core';

export default function ServerSide({deputados}) {
    return (
        <Grid container>
            {deputados.map((d, i) => {
                return (
                    <Grid item xs={6} key={`gridItemFiltro${d.nome}`}>
                        {d.nome} ({d.siglaPartido})
                    </Grid>
                );
            })}
        </Grid>
    );
}

/**
 * Será invocada a todo request. Este exemplo claramente não seria necessário já que a lista de deputados não é atualizada
 * com tanta frequência
 * @param context
 */
export async function getServerSideProps(context) {
    const response = await fetch(
        'https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=RJ&ordem=ASC&ordenarPor=nome',
        {
            headers: {
                accept: 'application/json',
            },
        },
    );
    return {
        props: {
            deputados: (await response.json()).dados,
        },
    };
}
