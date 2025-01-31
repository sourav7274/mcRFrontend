import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from './components/Header';
import { getJobs, deleteJob } from './features/jobSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const { jobs } = useSelector(state => state.jobs);
  // console.log(jobs);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteJob(id));
    dispatch(getJobs());
  };

  const filteredJobs = jobs?.filter(job => 
    (filter === '' || job.companyDetails.jobType === filter) &&
    (searchQuery === '' || job.jobtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Header />
      <main className='container my-4'>
        {jobs && (
          <>
            <div>
              <select onChange={handleFilterChange} value={filter} className='form-select'>
                <option value=''>All</option>
                <option value='Full-time(on-site)'>Full-time(on-site)</option>
                <option value='Part-time(on-site)'>Part-time(on-site)</option>
                <option value='Full-time(remote)'>Full-time(remote)</option>
                <option value='Part-time(remote)'>Part-time(remote)</option>
              </select>
            </div>
            <div className='mt-3'>
              <input 
                type='text' 
                placeholder='Search by job title' 
                value={searchQuery} 
                onChange={handleSearchChange} 
                className='form-control'
              />
            </div>
            <div className='row mt-4'>
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div className='col-12 col-md-6 col-lg-4 my-3' key={job._id}>
                    <div className='card'>
                      <div className='card-body'>
                        <h5 className='card-title'>{job.jobtitle}</h5>
                        <h6 className='card-subtitle mb-2 text-muted'>{job.companyDetails.name}</h6>
                        <p className='card-text'>{job.companyDetails.location}</p>
                        <p className='card-text'>Type: {job.companyDetails.jobType}</p>
                        <Link to={`/jobs/${job._id}`} className="btn btn-primary">Know More</Link><br/>
                        <button onClick={() => handleDelete(job._id)} className='mt-3 btn btn-danger'>Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='col-12'>
                  <p className='text-center'>No jobs available</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default App;
