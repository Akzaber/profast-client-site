import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEdit } from 'react-icons/fi';
import { FaMagnifyingGlass, FaRegTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    console.log(user.email);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data;
        }
    })

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
        window.location.assign(res.data.url);
        console.log(res.data.url);
    }

    const handleParcelDelete = id => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            // Refresh the data in the UI
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }
                    })

                // 
            }

        });
    }

    return (
        <div>
            <h2>there will be my parcels are shown for sure {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Tracking-ID</th>
                            <th>Delivery-Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel?.cost}</td>
                                <td>
                                    {
                                        parcel.paymentStatus === 'paid' ?
                                            <span className='text-green-500'>Paid</span>
                                            :
                                            <button onClick={() => handlePayment(parcel)} className="btn btn-sm btn-primary text-black">Pay</button>

                                    }
                                </td>
                                <td>
                                    <Link to={`/parcel-track/${parcel.trackingId}`}>{parcel.trackingId}</Link>
                                </td>
                                <td>{parcel.deliveryStatus}</td>
                                <td className='space-x-4'>
                                    <button className='btn btn-square hover:bg-primary'>
                                        <FaMagnifyingGlass />
                                    </button>
                                    <button className='btn btn-square hover:bg-primary'>
                                        <FiEdit></FiEdit>
                                    </button>
                                    <button
                                        onClick={() => handleParcelDelete(parcel._id)} className='btn btn-square hover:bg-primary'>
                                        <FaRegTrashCan></FaRegTrashCan>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;