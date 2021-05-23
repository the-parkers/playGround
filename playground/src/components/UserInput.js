import { Form } from 'react-bootstrap'
function UserOptions({type,value,setValue,id,label,message}) {
    return (
        
        <div className="form-floating">

             <Form.Control
            required
            type={type}
            id={id}
            placeholder={label}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
                {message}
            </Form.Control.Feedback>

        </div>
    )
}

export default UserOptions
