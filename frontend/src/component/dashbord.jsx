import React from 'react'
import '../styles/module.dashboard.css'
import {FiLink} from 'react-icons/fi'
import {RiBarChartFill} from 'react-icons/ri'

export default function Dashboard() {
  return (
      <div className='dashboard-container'>
          <div className='dashboard-content'>
              <div className='dashboard-header'>
                  <h1>Make everyconnection count</h1>
              </div>
              <div className='dashboard-search'>
                  <form className='dashboard-form'>
                      <input placeholder='enter long url'></input>
                      <button className=''>Ushort</button>
                  </form>
              </div>
              <div className='dashboard-data'>
                  <div className='dashboard-left'>
                      {/* header start here */}
                      <div className='data-heading'>
                          <div>
                              <p>1 link(s)</p>
                          </div>
                          <div>
                              <p>all time clicks</p>
                          </div>
                      </div>
                      {/* header ends here */}

                      {/* link list start here */}
                      <div className='link-data'>
                      <div>
                      <FiLink size={40}></FiLink>
                          </div>
                          <div className='flex-colunm  gap-6 justify-between text-sm'>
                              <p className='pb-2'>6/07/2023 10:23pm</p>
                              <p className='font-bold pb-2'>MDN</p>
                              <p>Dyst54</p>
                          </div>
                          <div className='flex-colunm   gap-6 justify-start items-start text-sm p-3 pb-3'>
                          <p className='pb-2'>clicks</p>
                              <p className='pb-2'>15</p>
                             <RiBarChartFill />
                          </div>
                      </div>
    
                  </div>
                  {/* link list ends here */}
                  <div className='dashboard-right'>
                      <div className='data-wrapper'>
                          <div>
                              <p className='text-md font-bold'>CREATED JUN 28, 2023, 12:47 PM | hebry</p>
                          </div>
                          <div>
                              <p className='font-bold text-lg'>MDN</p>
                          </div>
                          <div>
                              <p className='text-sm'>https://www.msn.com/en-us/sports/soccer/inter-miami-announce-additional-tickets-fo
r-messi-s-leagues-cup-debut-against-cruz-azul/ar-AA1d8p9x?cvid=47c0c4fe5e2d46b3cc50cb86304c600
9&ocid=winp2fptaskbarhover&ei=6</p>
                          </div>
                          <div className='flex justify-start gap-8'>
                              <p>ushort.ly/Dyst54</p>
                              <div className='flex justify-center gap-3'>
                                  <button>Copy</button>
                                  <button> Edit</button>
                                  <button>Delete</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>

    </div>
  )
}
