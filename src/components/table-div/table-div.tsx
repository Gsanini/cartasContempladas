import TableContemplados from "../table-cartas-contempladas";

export default function TableDiv() {
  return (
    <div className="w-full px-4 md:px-20 lg:px-40 xl:px-100 mt-15">
      <div>
        <h1 className="text-[27px] font-semibold mb-1 text-cor-texto leading-none">
          Cartas Contempladas
        </h1>
        <p className="text-gray-400 text-[13px] ml-0.5">
          Confira abaixo os créditos disponíveis e solicite a análise para sua
          aquisição.
        </p>
      </div>
      <div className="mt-15">
        <TableContemplados />
      </div>
    </div>
  );
}
