import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '../Theme'

export const useStyles = makeStyles((theme) => ({
    toolbar: {
        background: Theme.colors.secondary,
        display: 'flexbox',
        justifyContent: 'space-between',
    },
    //wrapper for main container
    wrapper: {
        height: "auto",
        background: Theme.colors.background,
        padding: theme.spacing(2, 2, 0, 32),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        }
    },

    //sidenav
    drawerPaper: {
        width: '250px',
        marginTop: '65px',
        [theme.breakpoints.down("sm")]: {
            marginTop: "0px"
        }
    },

    //navlink
    navlink: {
        textDecoration: 'none',
        color: Theme.colors.primary,
        "& :hover, :hover div": {
            color: Theme.colors.secondary,
        },
        '& div': { color: Theme.colors.primary },
    },

    navButton: {
        width: '100%',
        textTransform: 'capitalize'
    },

}))

