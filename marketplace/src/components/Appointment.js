import React from 'react';

const Appointment = props => (
        <div class="pt-5 pb-5 pr-5 pl-5">
            <h2 class="text-center">My Appointments</h2>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                    <table class="table table-bordered table-light">
                        <tbody>
                        <tr>
                            <td class="text-center">Date</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{props.appointment.date}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Time</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{props.appointment.time}</td>
                        </tr>
                        <tr>
                            <td class="text-center">PatientId</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{props.appointment.patientid}</td>
                        </tr>
                        <tr>
                            <td class="text-center">DoctorID</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{props.appointment.doctorid}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Status</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{props.appointment.status}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                <div class="col-3"></div>
            </div>
        </div>
    );

export default Appointment ;