import { NavLink } from 'react-router-dom'

const navArr = [
  {
    depthName : "문화・행사",
    depth2 : [
      {pathName : "진행중인 행사", path:"/eventList/ongoing"},
      {pathName : "예정된 행사", path:"/eventList/upcomming"},
      {pathName : "종료된 행사", path:"/eventList/end"}
    ]
  }
]

const navLinkStyle = ({isActive}:any) =>{
  if(isActive)
	return{
		fontWeight : 'bold'
	}
}

export const NavMenu = () => {
  return(
    <nav className="nav">
      <ul className="depth_1">
      { navArr.map((nav,index) => {
          return (
            <li key={index}>{nav.depthName}
              <ul className="depth_2">
                {nav.depth2.map((depth2, index) => {
                  return <li key={index}><NavLink to={depth2.path} style={navLinkStyle}>{depth2.pathName}</NavLink></li>
                })}
              </ul>
            </li>
          )
        })
      }
      </ul>
    </nav>
  )
}