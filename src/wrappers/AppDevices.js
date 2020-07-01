import React, { useState, useEffect, } from 'react'
import _ from 'lodash'
import { performScan, } from '@printer'

function AppDevices({ children, }) {
  useEffect(() => {
    performScan()
  }, [])

  return children
}

export default AppDevices
