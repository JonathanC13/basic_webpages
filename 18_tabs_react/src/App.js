import './App.css';
import Header from './components/Header'
import Tabs from './components/Tabs'
import JobInfo from './components/JobInfo'
import { useState, useEffect } from 'react'
import useAPIFetch from './hooks/useAPIFetch';

function App() {
  const url = 'http://localhost:3500/jobs'

  const [jobs, setJobs] = useState([])
  const [tabSelected, setTabSelected] = useState(0)
  const {data, isLoading, APIErr} = useAPIFetch(url) 

  useEffect(() => {
    setJobs(data)
  }, [data, setJobs])

  const handleTabChange = (tab) => {
    setTabSelected(tab)
  }

  return (
    <div className="App">
      <Header
        title={'Experience'}
      ></Header>
      <section className="section_experience">
        {isLoading && <p>Loading Jobs!</p>}
        {APIErr && <p style={{color:'red'}}>Error: {APIErr}</p>}
        {!isLoading && !APIErr && jobs && jobs.length === 0 && <p style={{fontSize:'2rem', color:'#C57B57'}}>{'NO JOBS :<'}</p>}
        {!isLoading && !APIErr && jobs && jobs.length > 0 &&
        <>
          <Tabs
            jobs={jobs}
            tabSelected={tabSelected}
            handleTabChange={handleTabChange}
          ></Tabs>
          <JobInfo
            jobs={jobs}
            tabSelected={tabSelected}
          ></JobInfo>
        </>
        }
      </section>
    </div>
  );
}

export default App;
