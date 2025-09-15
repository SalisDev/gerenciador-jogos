function Button(props: any) {
  return (
    <button
      type="button"
      {...props}
      className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 "
      onClick={() => {
        console.log('cliquei no botão');
        props.onClick();
      }}>
      {props.children}
    </button>
  );
}

export default Button;
