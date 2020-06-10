import React from 'react';

const IndividualTicketView = (payload) => {

    const { posts } = payload;

    console.log(posts);
    // const postList = posts.length ?
    //     posts.map(post => {
    //         return (
    //             <div className="individual-ticket-wrapper" key={post.id}>
    //                 <div className="ticket-id-wrapper">
    //                     {post.id}
    //                 </div>


    //             </div>
    //         )
    //     }) : <div></div>
    return (
        <div className="wrapper">
            {
                posts.length === 0 ? 'No Tickets Yet' :
                    console.log(typeof posts)

            }
        </div>
    )
}

export default IndividualTicketView;