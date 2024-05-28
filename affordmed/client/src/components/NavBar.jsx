import React from 'react'

const NavBar = () => {
    const logout =async () => {
        try {
            const response = await fetch("http://localhost:4000/Auth/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
             
                body: JSON.stringify({ email: localStorage.getItem('email') }), 
            }).then(() => { 
                localStorage.clear();
                window.location.href = '/';
                
               
            }).catch(error => {
                console.error('Logout error:', error.message);
            });
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    }
    
  return (
   <nav className="flex justify-between items-center h-16 bg-slate-800 text-white relative shadow-sm font-mono" role="navigation">
    <div className="pl-8">Affordmed</div> 
    <div className="pr-8">
      <a href="/" className="p-4">Login</a>
      <button className="p-4" onClick={logout}>Logout</button>
    </div>
    </nav>

  )
}

export default NavBar