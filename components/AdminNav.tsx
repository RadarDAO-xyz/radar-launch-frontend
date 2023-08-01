
interface Props {
    isUpdateProfile?: boolean;
}

export function AdminNav({isUpdateProfile = false}:Props) {

    return (
        <div className="admin-nav-bar flex mb-20">
            <img className="admin-founder-image" src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/645f08315a0001a9b5c9c81c_Screenshot%202023-05-13%20at%2010.45.59.png" />
            <div>
                <h1>Founder Name</h1>
                <p>0x...</p>
            </div>
            <div className="admin-links ml-auto">
                {isUpdateProfile && (
                    <a className="admin-link" href="/updates">Share Update ↗</a>
                )}
                {!isUpdateProfile && (
                    <a className="admin-link" href="/update-profile">Edit Profile ↗</a>
                )}
            </div>
        </div>
    )
}