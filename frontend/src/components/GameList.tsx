import Button from './Button';

function GameList(props: any) {
  return (
    <div className="space-y-4 p-6 bg-blue-200 rounded-md shadow">
      <h2 className="text-xl font-bold">Lista de Jogos</h2>

      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {props.games.map((game: any, index: number) => (
          <li
            key={index}
            className="flex justify-between items-start bg-white p-4 rounded-md shadow">
            <div className="flex gap-4">
              <img
                src={game.image}
                alt="capa"
                className="w-24 h-32 object-cover rounded"
              />
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-lg">Título: {game.title}</h2>
                <p>Gênero: {game.genre}</p>
                <p>Plataforma: {game.platform}</p>
                <p>Status: {game.status}</p>
              </div>
            </div>
            <Button>Botão</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
