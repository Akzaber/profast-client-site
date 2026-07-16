import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa6';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as an Admin`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: "user" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} Removed from Admin`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }
    return (
        <div>
            <h1 className='text-5xl font-extrabold'>Hello this page name is Users Management{users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                {user.role === 'admin' ? <button
                                    onClick={() =>
                                        handleRemoveAdmin(user)} className='btn bg-red-400'>
                                    <FiShieldOff></FiShieldOff>
                                </button> :
                                    <button onClick={() => handleMakeAdmin(user)} className='btn bg-green-500'>
                                        <FaUserShield></FaUserShield>
                                    </button>

                                }
                            </td>
                            <th>
                                Actions
                            </th>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;