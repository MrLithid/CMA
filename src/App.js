import React from 'react'
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'

import collection from './json/collection.json'

const generate_collection_items = () => {
  return (collection.map((item) => {
    return (
      <Button
        color="primary"
        key={item.example}>

          {item.example}

      </Button>
    )
  }))
}

const generate_grid = () => {
  return (
    <Grid container justify="center">
      {generate_collection_items()}
    </Grid>
  )
}

function App() {
  return generate_grid()
}

export default App;
