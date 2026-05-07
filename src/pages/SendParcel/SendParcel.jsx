import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { 
        register, 
        handleSubmit, 
        control, 
        // formState: { errors } 
    } 
        = useForm();

    const {user} = useAuth();    
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const senderRegion = useWatch({ control, name: "senderRegion" });
    const receiverRegion = useWatch({ control, name: "receiverRegion" });

    const districtByRegion = region => {
        const regionDistrict = serviceCenters.filter(c => c.region === region);
        const districts = regionDistrict.map(d => d.district);
        return districts;
    }

    const handleSendParcel = data => {
        console.log(data);
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        } else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 :
                    extraWeight * 40 + 40;
                cost = minCharge + extraCharge;

            }
        }
        console.log('cost', cost);
        data.cost = cost;

        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        }).then((result) => {
            if (result.isConfirmed) {

            //save the parcel info to the database
            axiosSecure.post('/parcels', data)
            .then(res => {
                console.log('after saving parcel', res.data)
            });

            //     Swal.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success"
            // });
            }
        });
    }
    return (
        <div className='mt-8 space-y-5'>
            <h1 className="text-5xl font-extrabold">Send A Parcel</h1>
            <h3 className="text-2xl font-bold">Enter Your Parcel Details</h3>
            <form onSubmit={handleSubmit(handleSendParcel)} className='my-12 text-black'>
                {/* Parcel Type */}
                <div>
                    <label className="label mr-4">
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>
                <div className='border border-base-300 my-5'></div>
                {/* Parcel Info: name, weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName', { required: true })} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (Kg)</label>
                        <input type="number" {...register('parcelWeight', { required: true })} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>
                <div className='border border-base-300 my-5'></div>
                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender Details */}
                    <fieldset className="fieldset">
                        <h2 className="text-2xl font-semibold">Sender Details</h2>
                        {/* sender name */}
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName', { required: true })} defaultValue={user?.displayName} className="input w-full" placeholder="Sender Name" />
                        {/* sender Email */}
                        <label className="label mt-4">Sender Email</label>
                        <input type="email" {...register('senderEmail', { required: true })} defaultValue={user?.email }
                        className="input w-full" placeholder="Sender Email" />

                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((region, index) => <option value={region} key={index}>{region}</option>)
                                }


                            </select>
                        </fieldset>

                        {/* Sender Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(senderRegion).map((region, index) => <option value={region} key={index}>{region}</option>)
                                }


                            </select>
                        </fieldset>

                        {/* sender address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress', { required: true })} className="input w-full" placeholder="Sender Address" />

                    </fieldset>

                    {/* receiver Details */}

                    <fieldset className="fieldset">
                        <h2 className="text-2xl font-semibold">Receiver Details</h2>
                        {/* Receiver name */}
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName', { required: true })} className="input w-full" placeholder="Receiver Name" />

                        {/* Receiver Email */}
                        <label className="label mt-4">Receiver Email</label>
                        <input type="email" {...register('receiverEmail', { required: true })} className="input w-full" placeholder="Receiver Email" />

                        {/* Receiver region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Regions</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((region, index) => <option value={region} key={index}>{region}</option>)
                                }


                            </select>
                        </fieldset>

                        {/* Receiver Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Districts</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(receiverRegion).map((region, index) => <option value={region} key={index}>{region}</option>)
                                }


                            </select>
                        </fieldset>

                        {/* Receiver address */}
                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress', { required: true })} className="input w-full" placeholder="Receiver Address" />
                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary text-black my-8' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;