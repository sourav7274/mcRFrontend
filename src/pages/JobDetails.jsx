import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobs } from "../features/jobSlice";

const JobDetails = () => {
    const dispatch = useDispatch();
    const [job,setJobs] = useState({})
    const { id } = useParams();
    const {jobs} = useSelector(state => state.jobs)

useEffect(() => {
    if (jobs) {
        setJobs(jobs.find(job => job._id === id));
    }
}, [jobs, id]);

    useEffect(() => {
     dispatch(getJobs());
    }, [dispatch, id]);
    // console.log(job)
    return (
        <>
            <Header />
            <main className="container p-5">
                {job ? (
                    <>
                        <h1>{job?.jobtitle}</h1>
                        <h2>{job?.companyDetails?.name}</h2>
                        <p><strong>Location:</strong> {job?.companyDetails?.location}</p>
                        <p><strong>Salary:</strong> {job?.companyDetails?.salary}</p>
                        <p><strong>Type:</strong> {job?.companyDetails?.jobType}</p>
                        <h3>Required Qualifications</h3>
                        <ol>
                            {job?.requiredQualifications?.map((qualification, index) => (
                                <li key={index}>{qualification}</li>
                            ))}
                        </ol>
                        <h3>Job Description</h3>
                        <p>{job?.description}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </main>
        </>
    );
};

export default JobDetails;