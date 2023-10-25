import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Store } from '../../store/store.types'
import { useAppDispatch } from '../../store/store'
import { clearUser, logoutUser } from '../../store/userSlice'

export const pages = [
  {
    name: 'Вход',
    path: '/login',
    id: 1,
  },
  {
    name: 'Регистрация',
    path: '/registration',
    id: 2,
  },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: Store) => state.user.user);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onLogout = () => {
    setAnchorElNav(null)

    dispatch(logoutUser())
      .then(() => {
        dispatch(clearUser())
      })
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: 'black' }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            YandexLogo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography
                    to={page.path}
                    component={Link}
                    sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={onLogout}>
                <span>Выйти</span>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
              letterSpacing: '.3rem',
            }}
          >
            YandexLogo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
            <MenuItem onClick={onLogout}>
              <span>Выйти</span>
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
