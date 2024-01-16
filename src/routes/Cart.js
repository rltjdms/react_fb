import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from "../reducers/CartSlice";
import styled from 'styled-components';

let CartBox = styled.section`
`

function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <CartBox className='container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        dispatch(addItem({ id: item.id, name: item.name, count: 1 }));
                                    }}
                                >
                                    +
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </CartBox>
    );
}

export default Cart;