import { useState } from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { addJob } from "../features/jobSlice";

const JobPostings = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setType] = useState("");
    const [qual, setQual] = useState("");
    const [des, setDes] = useState("");

    const formSubmit = async (e) => {
        e.preventDefault();

        const data = {
            jobtitle: title,
            companyDetails: {
                name,
                location,
                salary: Number(salary),
                jobType,
            },
            requiredQualifications: qual.split(";").map(q => q.trim()),
            description: des
        };

        try {
            await dispatch(addJob(data));
            alert("Job posted successfully!");
            setTitle("");
            setName("");
            setLocation("");
            setSalary("");
            setType("");
            setQual("");
            setDes("");
        } catch (error) {
            alert("Failed to post job.");
        }
    };

    return (
        <>
            <Header />
            <div className="container my-5">
                <h1 className="my-4">Post a Job</h1>
                <form onSubmit={formSubmit}>
                    <div className="mb-3">
                        <label className="form-label"><b>Job Title:</b></label>
                        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><b>Company Name:</b></label>
                        <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><b>Location:</b></label>
                        <input className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><b>Salary:</b></label>
                        <input type="number" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><b>Job Type:</b></label>
                        <select className="form-select" value={jobType} onChange={(e) => setType(e.target.value)} required>
                            <option value="">Select Job Type</option>
                            <option value="Full-time(on-site)">Full-time(on-site)</option>
                            <option value="Part-time(on-site)">Part-Time(on-site)</option>
                            <option value="Full-time(remote)">Full-time(remote)</option>
                            <option value="Part-time(remote)">Part-Time(remote)</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><b>Job Description:</b></label>
                        <textarea cols="50" rows="5" className="form-control" value={des} onChange={(e) => setDes(e.target.value)} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><b>Job Qualifications (Separate with ";"):</b></label>
                        <input className="form-control" value={qual} onChange={(e) => setQual(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
};

export default JobPostings;
