import { settings } from 'cluster';

export const styles = [
  /* === {ALTCOIN PRICE WIDGET} === */
  {
    widgetName: 'altcoin-price-widget',
    defaultTheme: 'white',
    defaultCoin: 'LTC',
    hiddenCoins: ['BTC'],
    hiddenPeriod: ['30d'],
    currencySwitcher: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    demension: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'No Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      settings: 'col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3'
    },
    styles: {
      iframe: {
        width: '300px',
        height: '290px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#4d4bed',
        crosshair: '#a3a3a3',
        axisColor: '#e7e7e7',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#fff',
        series: '#fff',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#414345',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#5b6bd1',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a52a2a',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === {END ALTCOIN PRICE WIDGET} === */

  /* === {ALTCOIN PRICE LIST} === */
  {
    widgetName: 'altcoin-price-lists-widget',
    defaultTheme: 'white',
    demension: false,
    defaultCoin: 'LTC,ETH,XRP',
    hiddenPeriod: ['30d'],
    currencySwitcher: false,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      settings: 'col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3'
    },
    styles: {
      iframe: {
        width: '300px',
        height: '290px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#4d4bed',
        crosshair: '#a3a3a3',
        axisColor: '#e7e7e7',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#fff',
        series: '#fff',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#414345',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#5b6bd1',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a52a2a',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === {END ALTCOIN PRICE LIST} === */

  /* === {ANIMATED MARKET TICKER WIDGET} === */
  {
    widgetName: 'animated-market-ticker-widget',
    defaultTheme: 'white',
    defaultCoin: 'BTC,LTC,ETH,XRP',
    currencySwitcher: false,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    demension: true,
    onlyWidth: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '600px',
        height: '40px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#444',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        background: 'linear-gradient(to right, #372fc1 0%, #5b6bd1 100%)',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        background: 'linear-gradient(to right, #094247, #33706b)',
        preloader: '#fff'
      }
    }
  },
  /* === {ANIMATED MARKET TICKER WIDGET} === */

  /* === {BITCOIN PRICE CHART} === */
  {
    widgetName: 'bitcoin-price-chart',
    defaultTheme: 'blue',
    defaultCoin: 'BTC',
    currencySwitcher: true,
    demension: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '540px',
        height: '400px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#444',
        point: '#a3a3a3',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#dcdcdc',
        background: 'linear-gradient(to right, #ece9e6, #ffffff)',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#eee',
        series: '#b9b9b9',
        crosshair: '#eee',
        axisColor: '#666',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ccd6df',
        crosshair: '#fff',
        axisColor: '#8d8eda',
        background: 'linear-gradient(to right, #372fc1 0%, #5b6bd1 100%)',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#cf4e53',
        crosshair: '#fff',
        axisColor: '#9b0000',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#85b3a5',
        crosshair: '#fff',
        axisColor: '#4eafaa',
        background: 'linear-gradient(to right, #094247, #33706b)',
        preloader: '#fff'
      }
    }
  },
  /* === {END BITCOIN PRICE CHART} === */

  /* === {BITCOIN PRICE WIDGET} === */
  {
    widgetName: 'bitcoin-price-widget',
    defaultTheme: 'white',
    currencySwitcher: false,
    demension: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      settings: 'col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3'
    },
    styles: {
      iframe: {
        width: '300px',
        height: '290px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#4d4bed',
        crosshair: '#a3a3a3',
        axisColor: '#e7e7e7',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#fff',
        series: '#fff',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#414345',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#5b6bd1',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a52a2a',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === {END BITCOIN PRICE WIDGET} === */

  /* === {CRYPTOCURRENCY MARKET} === */
  {
    widgetName: 'cryptocurrency-market',
    defaultTheme: 'white',
    currencySwitcher: false,
    defaultHighlight: 'highlight',
    highlightSwitcher: false,
    demension: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      widgetWrap: 'row justify-content-center w-100 flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '956px',
        height: '370px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#4d4bed',
        crosshair: '#a3a3a3',
        axisColor: '#000',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#fff',
        series: '#fff',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#414345',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#5b6bd1',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a52a2a',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === {END CRYPTOCURRENCY MARKET} === */

  /* === {PERIODIC PRICE CHART} === */
  {
    widgetName: 'periodic-price-chart',
    defaultTheme: 'white',
    defaultCoin: 'BTC',
    currencySwitcher: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      widgetWrap: 'row justify-content-center w-100 flex-column',
      settings: 'col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3'
    },
    styles: {
      iframe: {
        width: '880px',
        height: '530px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#444',
        crosshair: '#a3a3a3',
        axisColor: '#000',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#414345',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#5b6bd1',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a52a2a',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === {END PERIODIC PRICE CHART} === */

  /* === {PRICE TICKER} === */
  {
    widgetName: 'price-ticker',
    defaultTheme: 'white',
    defaultCoin: 'BTC',
    currencySwitcher: true,
    demension: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: false,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      settings: 'col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3'
    },
    styles: {
      iframe: {
        width: '290px',
        height: '240px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#4d4bed',
        crosshair: '#a3a3a3',
        axisColor: '#000',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#fff',
        series: '#fff',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#414345',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#5b6bd1',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a52a2a',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === {END PRICE TICKER} === */

  /* === {PRICING INDEX} === */
  {
    widgetName: 'pricing-index',
    defaultTheme: 'white',
    defaultCoin: 'BTC',
    currencySwitcher: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    demension: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      settings: 'col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3'
    },
    styles: {
      iframe: {
        width: '400px',
        height: '400px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#4d4bed',
        crosshair: '#a3a3a3',
        axisColor: '#000',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#fff',
        series: '#fff',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#414345',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#5b6bd1',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a52a2a',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === {END PRICING INDEX} === */

  /* === {SIMPLE BITCOIN PRICE} === */
  {
    widgetName: 'simple-bitcoin-price',
    defaultTheme: 'green',
    defaultCoin: 'BTC',
    currencySwitcher: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    demension: false,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      settings: 'col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3'
    },
    styles: {
      iframe: {
        width: '275px',
        height: '80px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#282a2e',
        background: 'linear-gradient(to right, #b1dfdb, #bbddfb)',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        background: 'linear-gradient(to right, #372fc1, #5b6bd1)',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        background: 'linear-gradient(to right, #00695b, #273593)',
        preloader: '#fff'
      }
    }
  },
  /* === {END SIMPLE BITCOIN PRICE} === */

  /* === {SINGLE TICKER} === */
  {
    widgetName: 'single-ticker',
    defaultTheme: 'green',
    defaultCoin: 'BTC',
    currencySwitcher: true,
    demension: false,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      settings: 'col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3'
    },
    styles: {
      iframe: {
        width: '170px',
        height: '70px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#282a2e',
        background: 'linear-gradient(to right, #b1dfdb, #bbddfb)',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        background: 'linear-gradient(to right, #372fc1, #5b6bd1)',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        background: 'linear-gradient(to right, #00695b, #273593)',
        preloader: '#fff'
      }
    }
  },
  /* === {END SINGLE TICKER} === */

  /* === {TICKER WIDGET} === */
  {
    widgetName: 'ticker-widget',
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '600px',
        height: '62px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    defaultShape: 'rounded',
    changeShape: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultTheme: 'white',
    defaultCoin: 'BTC,LTC,ETH,XRP',
    theme: {
      white: {
        color:  '#4d4bed',
        background: '#fff',
        preloader: '#000',
        width: '600px'
      },
      black: {
        color:  '#4d4bed',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        background: 'linear-gradient(to right, #372fc1, #5b6bd1)',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        background: 'linear-gradient(to right, #00695b, #273593)',
        preloader: '#fff'
      }
    }
  },
  /* === {END TICKER WIDGET} === */

  /* === {SQUARE WIDGET} === */
  {
    widgetName: 'square-widget',
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '300px',
        height: '116px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      },
      widgetStyles: {
        mini: {
          name: 'mini',
          iframeOption: {
            width: '240px',
            height: '60px',
          }
        },
        classic: {
          name: 'classic',
          iframeOption: {
            width: '300px',
            height: '116px',
          }
        },
        'advanced01': {
          name: 'advanced01',
          iframeOption: {
            width: '300px',
            height: '100px',
          }
        },
        'advanced02': {
          name: 'advanced02',
          iframeOption: {
            width: '300px',
            height: '120px',
          }
        },
        'advanced03': {
          name: 'advanced03',
          iframeOption: {
            width: '300px',
            height: '133px',
          }
        },
        'advanced04': {
          name: 'advanced04',
          iframeOption: {
            width: '170px',
            height: '211px',
          }
        }
      }
    },
    defaultShape: 'rounded',
    changeShape: true,
    styleSwitcher: true,
    demension: false,
    defaultStyle: 'classic',
    defaultTheme: 'white',
    defaultCoin: 'BTC',
    currencySwitcher: 'true',
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    theme: {
      white: {
        color:  '#4d4bed',
        background: '#fff',
        preloader: '#000',
      },
      black: {
        color:  '#4d4bed',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        background: 'linear-gradient(to right, #372fc1, #5b6bd1)',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        background: 'linear-gradient(to right, #00695b, #273593)',
        preloader: '#fff'
      }
    }
  },
  /* === {END SQUARE WIDGET} === */

  /* === {SMALL CHART} === */
  {
    widgetName: 'small-chart',
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '390px',
        height: '62px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      },
      widgetStyles: {
        classic: {
          name: 'classic',
          iframeOption: {
            width: '390px',
            height: '62px'
          }
        },
        'advanced01': {
          name: 'advanced01',
          iframeOption: {
            width: '300px',
            height: '150px'
          }
        },
        'advanced02': {
          name: 'advanced02',
          iframeOption: {
            width: '300px',
            height: '150px'
          }
        },
        'advanced03': {
          name: 'advanced03',
          iframeOption: {
            width: '550px',
            height: '115px'
          }
        },
        'advanced04': {
          name: 'advanced04',
          iframeOption: {
            width: '300px',
            height: '150px'
          }
        }
      }
    },
    defaultShape: 'rounded',
    changeShape: true,
    styleSwitcher: true,
    demension: false,
    defaultStyle: 'classic',
    defaultTheme: 'white',
    defaultCoin: 'BTC',
    currencySwitcher: 'true',
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    theme: {
      white: {
        color:  '#4d4bed',
        background: '#fff',
        preloader: '#000',
        series: '#6C70B9',
      },
      black: {
        color:  '#4d4bed',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff',
        series: '#fff'
      },
      blue: {
        color: '#fff',
        background: 'linear-gradient(to right, #372fc1, #5b6bd1)',
        preloader: '#fff',
        series: '#fff',
      },
      brown: {
        color: '#fff',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff',
        series: '#6C70B9',
      },
      green: {
        color: '#fff',
        background: 'linear-gradient(to right, #00695b, #273593)',
        preloader: '#fff',
        series: '#fff',
      }
    }
  },
  /* === {END SMALL CHART} === */

  /* === {COMPARISON WIDGET} === */
  {
    widgetName: 'comparison-widget',
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '950px',
        height: '547px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    defaultShape: 'rounded',
    changeShape: true,
    defaultTheme: 'white',
    currencySwitcher: false,
    defaultHighlight: 'highlight',
    highlightSwitcher: false,
    demension: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#4d4bed',
        crosshair: '#a3a3a3',
        axisColor: '#000',
        background: '#ffffff',
        preloader: '#000'
      },
      black: {
        color: '#000',
        point: '#fff',
        series: '#fff',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#90a4ae',
        preloader: '#fff'
      },
      blue: {
        color: '#424242',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#b3e5fc',
        preloader: '#fff'
      },
      brown: {
        color: '#424242',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a1887f',
        preloader: '#fff'
      },
      green: {
        color: '#424242',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === {END COMPARISON WIDGET} === */

  /* === {LEADERBOARDS} === */
  {
    widgetName: 'leaderboards',
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '1000px',
        height: '111px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      },
      widgetStyles: {
        classic: {
          name: 'classic',
          iframeOption: {
            width: '1000px',
            height: '111px'
          }
        },
        advanced: {
          name: 'advanced',
          iframeOption: {
            width: '1000px',
            height: '124px'
          }
        }
      }
    },
    defaultShape: 'rounded',
    changeShape: true,
    styleSwitcher: true,
    demension: true,
    defaultStyle: 'classic',
    defaultTheme: 'white',
    defaultCoin: 'BTC',
    currencySwitcher: 'true',
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    theme: {
      white: {
        color:  '#000',
        background: '#fff',
        preloader: '#000',
      },
      black: {
        color:  '#fff',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        background: 'linear-gradient(to right, #372fc1, #5b6bd1)',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        background: 'linear-gradient(to right, #00695b, #273593)',
        preloader: '#fff'
      }
    }
  },
  /* === {END LEADERBOARDS} === */

  /* === {LINE WIDGET} === */
  {
    widgetName: 'line-widget',
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '410px',
        height: '25px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    defaultShape: 'rounded',
    defaultTheme: 'white',
    defaultCoin: 'BTC',
    currencySwitcher: 'true',
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    demension: true,
    onlyWidth : true,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    changeShape: true,
    theme: {
      white: {
        background: '#ffffff'
      }
    }
  },
  /* === {END LINE WIDGET} === */

  /* === {CRYPTO CALCULATION} === */
  {
    widgetName: 'crypto-calculation',
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '645px',
        height: '203px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    defaultShape: 'rounded',
    changeShape: true,
    defaultTheme: 'white',
    currencySwitcher: false,
    demension: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: false,
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    theme: {
      white: {
        color:  '#000',
        background: '#fff',
        preloader: '#000',
      },
      black: {
        color:  '#4d4bed',
        background: 'linear-gradient(to right, #232526, #414345)',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        background: 'linear-gradient(to right, #372fc1, #5b6bd1)',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        background: 'linear-gradient(to right, #200122, #6f0000)',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        background: 'linear-gradient(to right, #00695b, #273593)',
        preloader: '#fff'
      }
    }
  },
  /* === {END CRYPTO CALCULATION} === */

  /* === { SMAL-CHARTS-WIDGET } === */
  {
    widgetName: 'small-charts-widget',
    defaultTheme: 'white',
    currencySwitcher: false,
    demension: true,
    defaultHighlight: 'highlight',
    highlightSwitcher: true,
    hiddenPeriod: ['30d'],
    highlightRealtimeUpdate: {
      highlight: true,
      'no Highlight': false
    },
    defaultShape: 'rounded',
    changeShape: true,
    classes: {
      widgetWrap: 'row flex-column',
      settings: 'col-6 col-sm-4 col-md-2'
    },
    styles: {
      iframe: {
        width: '1120px',
        height: '315px',
        border: '1px solid #e3e3e3'
      },
      IframeShadows: {
        shadow: {
          style: '1px 1.7px 5px rgba(0,0,0,0.2)'
        },
        'No Shadow': {
          style: 'none'
        }
      },
      shape: {
        square: {
          borderRadius: '0px'
        },
        rounded: {
          borderRadius: '5px'
        },
        round: {
          borderRadius: '20px',
        }
      }
    },
    theme: {
      white: {
        color: '#000',
        point: '#444',
        series: '#4d4bed',
        crosshair: '#a3a3a3',
        axisColor: '#e7e7e7',
        background: 'transperent',
        preloader: '#000'
      },
      black: {
        color: '#fff',
        point: '#fff',
        series: '#fff',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#414345',
        preloader: '#fff'
      },
      blue: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#5b6bd1',
        preloader: '#fff'
      },
      brown: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#a52a2a',
        preloader: '#fff'
      },
      green: {
        color: '#fff',
        point: '#fff',
        series: '#ddd',
        crosshair: '#a3a3a3',
        axisColor: '#a4a4a4',
        background: '#33706b',
        preloader: '#fff'
      }
    }
  },
  /* === { END SMAL-CHARTS-WIDGET } === */
];
