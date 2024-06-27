import React, { useState } from 'react'
import '../styles/Header.css';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/authActions';
import { Link, useLocation } from 'react-router-dom';
import { getDataApi } from '../utils/fetchDataApi';
import UserCard from './UserCard';
import LoadingIcon from '../images/loading.gif'


export const Header = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();
    const { auth , notify } = useSelector(state => state);
    const { pathname } = useLocation();




    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    const handleClose = () => {
        setSearch('');
        setUsers([]);

    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;
        try {
            setLoad(true);
            const res = await getDataApi(`search?username=${search}`, auth.token);
            setUsers(res.data.users);
            setLoad(false);
        } catch (err) {
            dispatch({
                type: 'ALERT',
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
    return (
        <div className='header'>
            <div className='header-right'>
                <h3>Social Network</h3>
            </div>
            <form className='header-center' onSubmit={handleSearch}>
                <input
                    type='text'
                    placeholder='Search Profiles'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <SearchIcon style={{ opacity: users.length > 0 ? '0' : '1' }} />
                <span className='header-centersearchclose' onClick={handleClose} style={{ opacity: users.length > 0 ? '1' : '0' }}>&times;</span>
                <button type="submit" style={{ display: 'none' }}>Search</button>

                <div className='headers-searchusers'>
                    {load && <img src={LoadingIcon} alt='' style={{ width: '100%', height: '40px' }} />}
                    {
                        search && users.length > 0 && users.map(user => (

                            <UserCard user={user} key={user._id} handleClose={handleClose} />
                        ))
                    }
                </div>
            </form>

            <div className='header-left'>
                <Link to={`/profile/${auth.user._id}`}>
                    <div className='header-leftAvatar'>
                        <Avatar src={auth.user.avatar} />
                        <h5 style={{ color: 'white' }}>{auth.user.fullname}</h5>
                    </div>
                </Link>
                <Link to='/'>
                    <IconButton>
                        <HomeIcon className={`${isActive('/')}`} />
                    </IconButton>
                </Link>
                <Link to='/message'>
                    <IconButton>
                        <MessageIcon className={`${isActive('/message')}`} />
                    </IconButton>
                </Link>
                <Link to='/notification'>
                    <IconButton>
                        <NotificationsIcon className={`${isActive('/notification')}`} />
                    </IconButton>
                    <span style={{position:'absolute', transform:'translate(-26px,16px)',color:'white', fontSize:'10px'}}>{notify && notify.data.length}</span>
                </Link>
                <Link to='/explore'>
                    <IconButton>
                        <ExploreIcon className={`${isActive('/explore')}`} />
                    </IconButton>
                </Link>
                <IconButton onClick={() => dispatch(logout())}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
        </div>
    )
}
export default Header;