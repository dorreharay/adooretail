import React, { useState, useEffect, } from 'react'
import _ from 'lodash'
import { scanDevices, } from '@printer'

function AppDevices({ children, }) {
  useEffect(() => {
    // scanDevices()
  }, [])

  return children
}

export default AppDevices
