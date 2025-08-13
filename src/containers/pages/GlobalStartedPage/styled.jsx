import { Box, styled } from '@mui/material';
import backgroundStartedFirst from 'assets/images/background/PageStaredFirst.svg';
import backgroundStartedLast from 'assets/images/background/PageStaredLast.svg';

export default styled(Box)(({ theme }) => ({
  backgroundColor: 'black',
  width: '100%',
  height: '100%',
  overflow: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '& *': {
    fontFamily: 'Folks'
  },

  '& .content': {
    width: ' 100%',
    backgroundColor: 'white'
  },
  '& .section-one': {
    backgroundImage: `url(${backgroundStartedFirst})`,
    backgroundSize: 'cover',
    backgroundPositionY: 'bottom',
    backgroundPositionX: 'center',
    '& > div:last-child': {
      '& > button': {
        fontWeight: 'bold',
        textTransform: 'none',
        letterSpacing: 'normal',
        padding: 0,
        margin: 0,
        borderRadius: 1000,
        fontFamily: 'Folks'
      }
    }
  },
  '& .box-content': {
    display: 'flex',
    alignSelf: 'flex-start',

    '& *': {
      lineHeight: 1.2
    },
    '& img': {
      minWidth: 'auto',
      minheight: 'auto',
      width: 'auto',
      height: 'auto',
      alignSelf: 'flex-end'
    }
  },
  '& .map-desc': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 0,

    '& > p': {
      fontFamily: 'Folks'
    }
  },
  '& .section-two': {
    '& > div': {
      '& > h2': {
        textDecoration: 'underline',
        textAlign: 'center',
        fontFamily: 'Folks'
      },
      '& > p': {
        textAlign: 'center',
        fontFamily: 'Folks'
      },
      '& img': {
        minWidth: 'auto',
        minheight: 'auto',
        width: 'auto',
        height: 'auto'
      }
    }
  },
  '& .list-card-service': {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '& .card-service': {
    backgroundColor: '#f7fbfe',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Folks'
  },
  '& .section-three': {
    backgroundImage: `url(${backgroundStartedLast})`,
    backgroundSize: 'cover',
    backgroundPositionY: 'top',
    backgroundPositionX: 'center',
    fontFamily: 'Folks',
    '& > div': {
      display: 'flex',
      '& img': {
        minWidth: 'auto',
        minheight: 'auto',
        width: 'auto',
        height: 'auto'
      }
    }
  },
  '& .button-staff-group': {
    margin: '0 auto',
    width: '75%',
    display: 'flex',
    '& > button': {
      flex: 1,
      padding: 0
    }
  },

  '& .app-description': {
    '& > p': {
      lineHeight: 1.2
    }
  },

  [theme.breakpoints.only('xs')]: {
    '& .content': {
      height: 'auto'
    },
    '& .section-one': {
      textAlign: 'center',
      '& > div:last-child': {
        '& > button': {
          margin: '0 auto',
          padding: '1.2vw 6vw',
          fontSize: '2.5vw'
        }
      }
    },
    '& .box-content': {
      padding: '0 8vw',
      marginTop: '2vw',
      flexDirection: 'column-reverse',
      marginBottom: '4vw',
      gap: '3vw',
      '& > div:last-child': {
        alignSelf: 'center',
        justifySelf: 'center',
        '& > img': {
          height: '60vw'
        }
      },
      '& > div:first-of-type': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > h1': {
          fontSize: '6vw',
          marginBottom: '4vw'
        },
        '& > p': {
          fontSize: '3vw',
          textAlign: 'center'
        }
      }
    },
    '& .map-desc': {
      marginTop: '6vw',
      gap: '2vw',
      width: '100%',
      '& > p': {
        fontSize: '2.5vw',
        textAlign: 'start'
      },
      '& > img': {
        height: '6.5vw'
      }
    },
    '& .section-two': {
      padding: '15vw 10vw 5vw',
      '& > div': {
        '& > h2': {
          fontSize: '5vw',
          marginBottom: '5vw'
        },
        '& > p': {
          fontSize: '3.3vw'
        }
      }
    },
    '& .list-card-service': {
      flexDirection: 'column',
      gap: '4vw',
      padding: '0 10vw',
      marginBottom: '8vw'
    },
    '& .card-service': {
      outline: 'rgba(215, 233, 255, 0.3) solid 1.5vw',
      border: '1.5vw solid rgba(215, 233, 255, 0.6)',
      borderRadius: '3vw',
      padding: '4vw 6vw',
      width: '100%',
      gap: '2vw',
      '& > h3': {
        fontSize: '4vw'
      },
      '& > img': {
        width: '80%'
      },
      '& > p': {
        marginTop: '1.5vw',
        fontSize: '3vw'
      }
    },
    '& .section-three': {
      padding: '10vw 5vw 10vw',
      '& > div': {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2vw',
        '& > img': {
          height: '60vw'
        }
      }
    },
    '& .app-description': {
      '& > h2': {
        textAlign: 'center',
        fontSize: '7vw',
        marginBottom: '2vw'
      },
      '& > h3': {
        textAlign: 'center',
        fontSize: '3.5vw',
        marginBottom: '3vw',
        textDecoration: 'underline'
      },
      '& > p': {
        textAlign: 'center',
        fontSize: '3.5vw',
        marginBottom: '5vw'
      }
    },
    '& .button-staff-group': {
      gap: '5vw',
      '& > button > img': {
        width: '100%'
      }
    }
  },

  [theme.breakpoints.only('sm')]: {
    '& .content': {
      height: 'auto'
    },
    '& .section-one': {
      textAlign: 'center',
      '& > div:last-child': {
        '& > button': {
          margin: '0 auto',
          padding: '1vw 5vw',
          fontSize: '2vw'
        }
      }
    },
    '& .box-content': {
      padding: '0 8vw',
      marginTop: '3vw',
      flexDirection: 'column-reverse',
      marginBottom: '3vw',
      gap: '3vw',
      '& > div:last-child': {
        alignSelf: 'center',
        justifySelf: 'center',
        '& > img': {
          height: '50vw'
        }
      },
      '& > div:first-of-type': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > h1': {
          fontSize: '5vw',
          marginBottom: '3vw'
        },
        '& > p': {
          fontSize: '2.5vw',
          textAlign: 'center'
        }
      }
    },
    '& .map-desc': {
      marginTop: '6vw',
      gap: '2vw',
      width: '100%',
      '& > p': {
        fontSize: '2vw',
        textAlign: 'start'
      },
      '& > img': {
        height: '6vw'
      }
    },
    '& .section-two': {
      padding: '15vw 10vw 5vw',
      '& > div': {
        '& > h2': {
          fontSize: '4vw',
          marginBottom: '5vw'
        },
        '& > p': {
          fontSize: '2.2vw'
        }
      }
    },
    '& .list-card-service': {
      flexDirection: 'column',
      gap: '3vw',
      padding: '0 15vw',
      marginBottom: '5vw'
    },
    '& .card-service': {
      outline: 'rgba(215, 233, 255, 0.3) solid 1.2vw',
      border: '1.2vw solid rgba(215, 233, 255, 0.6)',
      borderRadius: '2.5vw',
      padding: '3vw 4.5vw',
      width: '100%',
      gap: '1.5vw',
      '& > h3': {
        fontSize: '3vw'
      },
      '& > img': {
        width: '80%'
      },
      '& > p': {
        marginTop: '1.5vw',
        fontSize: '2.3vw'
      }
    },
    '& .section-three': {
      padding: '10vw',
      '& > div': {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2vw',
        '& > img': {
          height: '50vw'
        }
      }
    },
    '& .app-description': {
      '& > h2': {
        textAlign: 'center',
        fontSize: '2vw',
        marginBottom: '1.5vw'
      },
      '& > h3': {
        textAlign: 'center',
        fontSize: '2vw',
        marginBottom: '3vw',
        textDecoration: 'underline'
      },
      '& > p': {
        textAlign: 'center',
        fontSize: '2vw',
        marginBottom: '5vw'
      }
    },
    '& .button-staff-group': {
      width: '65%',
      gap: '3vw',
      '& > button > img': {
        width: '100%'
      }
    }
  },

  [theme.breakpoints.up('md')]: {
    borderTopLeftRadius: '1.1vw',
    borderTopRightRadius: '1.1vw',
    outline: 'white solid 0.5vw',
    '& .content': {
      height: ' calc(100vh - 5vw)'
    },
    '& .section-one': {
      '& > div:last-child': {
        '& > button': {
          marginLeft: '7vw',
          padding: '0.3vw 1.8vw',
          fontSize: '0.9vw'
        }
      }
    },
    '& .box-content': {
      padding: '0 9vw 0 3vw',
      justifyContent: 'space-between',
      marginTop: '3vw',
      gap: '10vw',
      '& > div:last-child': {
        '& > img': {
          height: '22vw'
        }
      },
      '& > div:first-of-type': {
        '& > h1': {
          fontSize: '3vw',
          marginBottom: '1vw',
          textAlign: 'start'
        },
        '& > p': {
          fontSize: '1.5vw',
          textAlign: 'start'
        }
      }
    },
    '& .map-desc': {
      marginTop: '2vw',
      gap: '1vw',
      width: '65%',
      '& > p': {
        fontSize: '1vw',
        textAlign: 'start'
      },
      '& > img': {
        height: '3.5vw'
      }
    },
    '& .section-two': {
      padding: '3vw 12vw',
      '& > div': {
        '& > h2': {
          fontSize: '2vw',
          marginBottom: '4vw'
        },
        '& > p': {
          fontSize: '1.2vw'
        }
      }
    },
    '& .list-card-service': {
      gap: '2vw',
      marginBottom: '4vw',
      alignItems: 'stretch'
    },
    '& .card-service': {
      outline: 'rgba(215, 233, 255, 0.3) solid 0.5vw',
      border: '0.5vw solid rgba(215, 233, 255, 0.6)',
      borderRadius: '1vw',
      padding: '1.5vw 2vw',
      width: '30%',
      gap: '2vw',
      '& > h3': {
        fontSize: '1.3vw'
      },
      '& > img': {
        width: '80%'
      },
      '& > p': {
        marginTop: '0.5vw',
        fontSize: '1vw'
      }
    },
    '& .section-three': {
      padding: '8vw 5vw 3vw',
      '& > div': {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10vw',
        '& > img': {
          height: '35vw'
        }
      }
    },
    '& .app-description': {
      '& > h2': {
        textAlign: 'center',
        fontSize: '3vw',
        marginBottom: '1vw'
      },
      '& > h3': {
        textAlign: 'center',
        fontSize: '1.3vw',
        marginBottom: '1vw',
        textDecoration: 'underline'
      },
      '& > p': {
        textAlign: 'center',
        fontSize: '1.3vw',
        marginBottom: '2vw'
      }
    },
    '& .button-staff-group': {
      gap: '1vw',
      '& > button > img': {
        width: '100%'
      }
    }
  }
}));
