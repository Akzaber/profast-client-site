import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors } 
    }
        = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const riderRegion = useWatch({ control, name: "region" });
    const districtByRegion = region => {
        const regionDistrict = serviceCenters.filter(c => c.region === region);
        const districts = regionDistrict.map(d => d.district);
        return districts;
    }

    const handleRiderApplication = data => {
        console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. we will reach to you in 20 days",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }
    return (
        <div>
            <h1 className='text-4xl font-extrabold text-primary'>Be a Rider</h1>
            <form onSubmit={handleSubmit(handleRiderApplication)} className='my-12 text-black'>

                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* rider Details */}
                    <fieldset className="fieldset">
                        <h2 className="text-2xl font-semibold">Rider Details</h2>
                        {/* rider name */}
                        <label className="label">Rider Name</label>
                        <input type="text" {...register('riderName', { required: true })} defaultValue={user?.displayName} className="input w-full" placeholder="Rider Name" />
                        {/* rider Email */}
                        <label className="label mt-4">Rider Email</label>
                        <input type="email" {...register('riderEmail', { required: true })} defaultValue={user?.email}
                            className="input w-full" placeholder="Rider Email" />

                        {/* rider region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Regions</legend>
                            <select {...register('region')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((region, index) => <option value={region} key={index}>{region}</option>)
                                }


                            </select>
                        </fieldset>

                        {/* rider Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Districts</legend>
                            <select {...register('district')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(riderRegion).map((region, index) => <option value={region} key={index}>{region}</option>)
                                }


                            </select>
                        </fieldset>

                        {/* your address */}
                        <label className="label mt-4">Your Address</label>
                        <input type="text" {...register('address', { required: true })} className="input w-full" placeholder="Your Address" />

                    </fieldset>

                    {/* rider Details */}

                    <fieldset className="fieldset">
                        <h2 className="text-2xl font-semibold">More Details</h2>
                        {/* driving license */}
                        <label className="label">Driving License</label>
                        <input type="text" {...register('license', { required: true })} className="input w-full" placeholder="Driving License" />

                        {/* rider nid */}
                        <label className="label mt-4">NID</label>
                        <input type="text" {...register('NID')} className="input w-full" placeholder="NID" />


                        {/* Receiver address */}
                        <label className="label mt-4">Bike</label>
                        <input type="text" {...register('bike', { required: true })} className="input w-full" placeholder="bike" />
                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary text-black my-8' value="Apply as a Rider" />
            </form>
        </div>
    );
};

export default Rider;