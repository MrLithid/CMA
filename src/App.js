import React from 'react'
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import collection from './json/collection.json'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : '#00000000',
    border                : '#00000000'
  }
};

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 300,
    width: 800,
    backgroundSize: 'contain'
  },
});

const generate_collection_items = (handleOnClick) => {
  return (collection.map((item) => {
    return (
      <GridListTile key={item.id} cols={1} onClick={() => handleOnClick(item)}>
        <img src={item.image} alt={item.title} />
        <GridListTileBar
          title={item.title}
          subtile={item.description}
        />
      </GridListTile>
    )
  }))
}

const generate_grid = (handleOnClick) => {
  return (
    <GridList cols={3} cellHeight={180}>
      {generate_collection_items(handleOnClick)}
    </GridList>
  )
}

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const [artwork, setArtwork] = React.useState(null)

  const handleOnClick = (item) => {
    setArtwork(item)
    setOpen(true)
  }

  const generate_creators = (creators) => {
    if (creators?.length < 1) {
      return
    }

    return (
      <CardContent>
        {creators?.map((creator) => {
        return (
          <Typography variant="body2" component="p" key={creator?.role}>
          {creator?.role}, {creator?.description}
          </Typography>
        )})}
      </CardContent>
    )
  }

  return (
    <div>
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      contentLabel={artwork?.title}
      style={customStyles}
      ariaHideApp={false}>
      <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={artwork?.image}
        title={artwork?.title}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
        {artwork?.title}
        </Typography>
      </CardContent>
      {generate_creators(artwork?.creators)}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {artwork?.tombstone}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" component="p">
        Department, {artwork?.department_name}
        </Typography>
      </CardContent>
      <Button size="small" color="primary" onClick={() => setOpen(false)}>Close</Button>
      </Card>
    </Modal>
    {generate_grid(handleOnClick)}
    </div>
  )
}

export default App;
