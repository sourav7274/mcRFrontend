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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      await dispatch(deleteJob(id));
      dispatch(getJobs());
    }
  };

  const filteredJobs = jobs?.filter(job =>
    (filter === '' || job.companyDetails.jobType === filter) &&
    (searchQuery === '' || job.jobtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Header />
      <main className="container my-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <select onChange={handleFilterChange} value={filter} className="form-select w-auto">
            <option value="">All</option>
            <option value="Full-time(on-site)">Full-time (On-site)</option>
            <option value="Part-time(on-site)">Part-time (On-site)</option>
            <option value="Full-time(remote)">Full-time (Remote)</option>
            <option value="Part-time(remote)">Part-time (Remote)</option>
          </select>
          <input
            type="text"
            placeholder="Search by job title"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control w-50"
          />
        </div>

        <div className="row mt-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div className="col-12 col-md-6 col-lg-4 my-3" key={job._id}>
                <div className="card shadow-sm border-3 rounded-3 mb-4">
                  <div className="card-body">
                    <h5 className="card-title mb-2 text-truncate" style={{ maxWidth: '250px' }}>{job.jobtitle}</h5>
                    <h6 className="card-subtitle mb-3 text-muted">{job.companyDetails.name}</h6>
                    <p className="card-text mb-1"><strong>Location:</strong> {job.companyDetails.location}</p>
                    <p className="card-text mb-3"><strong>Type:</strong> {job.companyDetails.jobType}</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/jobs/${job._id}`}
                        className="btn btn-primary btn-sm d-flex align-items-center rounded-pill px-4"
                      >
                        <i className="bi bi-info-circle me-2"></i> Know More
                      </Link>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-danger btn-sm d-flex align-items-center rounded-pill px-4"
                      >
                        <i className="bi bi-trash me-2"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-5">
              <h5 className="text-muted">No jobs available</h5>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
