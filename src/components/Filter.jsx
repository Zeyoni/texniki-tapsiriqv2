import { useState } from "react"

const Filter = ({ data }) => {




    const [filter, setFilter] = useState({ productName: "", amount: "", date: "" });

    const handleFilterData = (name, value) => {
        setFilter((prevData) => ({
            ...prevData,
            [name]: value
        })
        )
    }

    // const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))
    const filterProduct1 = data.filter(item => item.product[0].name.toLowerCase().includes(filter.productName.toLowerCase()))
    const filterProduct2 = filterProduct1.filter(item => item.date.toLowerCase().includes(filter.date.toLowerCase()))
    const filterProduct3 = filterProduct2.filter(item => item.amount.toString().toLowerCase().includes(filter.amount.toString().toLowerCase()))

    return (
        <div>
            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="input-group">
                            <input type="text" className='form-control' placeholder='Search Product' id="productName" onChange={(e) => { handleFilterData("productName", e.target.value) }} />
                            <input type="number" className='form-control' placeholder='Enter the Amount' id="amount" onChange={(e) => { handleFilterData("amount", e.target.value) }} />
                            <input type="date" name='entry_date' className="form-control" id="date" onChange={(e) => { handleFilterData("date", e.target.value) }} />
                            <button className='btn btn-primary w-auto'>Filter</button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Order Amount</th>
                                    <th scope="col">Total Price</th>
                                </tr>
                            </thead>
                            <tbody className='border-top'>
                                {
                                    filterProduct3.map(({ _id, product, date, amount }) => (
                                        <tr key={_id}>
                                            <th scope="row">{product[0].name}</th>
                                            <td>{new Date(date).toISOString().split('T')[0]}</td>
                                            <td>{amount}</td>
                                            <td>{product[0].price}$</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter