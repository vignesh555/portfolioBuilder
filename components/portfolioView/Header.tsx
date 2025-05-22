interface IHeader {
    title: string,
}

function Header({ title }: IHeader) {
  return (
    <h1 className="flex flex-col w-full mb-3 text-3xl sm:text-2xl font-bold text-gray-600 self-start">
        {title}
    </h1>
  )
}

export default Header