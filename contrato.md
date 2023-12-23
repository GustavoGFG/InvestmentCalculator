//contrato
// 1 - Sistema deve usar o Tailwindcss
// 2 - Sistema deve ter um elemento html do tipo table (com id definido) preparado e sem informação dentro
// 3 - São necessários dois arrays para a geração da tabela...
// 3.1 - Um array de dados
// 3.2 - Um array com objetos que caracterizam as colunas
// 3.3 - Não é necessário, mas pode-se passar uma função de formatação dos dados daquela coluna

type columnObject = {
columnLabel: string,
accessor: string,
formatFN?: (info: number | string) => String,
};

type columnsArray = columnObject[];

[
{ columnLabel: 'Total Invested', accessor: 'interestAmount' },
{ columnLabel: 'Monthly Return', accessor: 'interestReturns' },
{ columnLabel: 'Total Return', accessor: 'totalInterestReturns' },
{ columnLabel: 'Month', accessor: 'month' },
{ columnLabel: 'Total Amount', accessor: 'totalAmount' },
];
