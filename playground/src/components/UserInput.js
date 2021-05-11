function UserOptions({type,value,setValue,id}) {
    return (
        <div className="form-floating">
            <input type={type} value={value} className="form-control" onChange={e => setValue(e.target.value)} id={id}/>
            <label htmlFor={id}>{id}</label>
        </div>
    )
}

export default UserOptions
