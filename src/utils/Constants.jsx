import { FaImages, FaStar, FaUserFriends, FaComments} from 'react-icons/fa';

export const menuList = [
    {
        id: 1,
        title: "Media Management",
        icon: <FaImages />,
        items: [
            { id: 1, title: "Movie", path: "/media_management/movie" },
            { id: 2, title: "Episode", path: "/media_management/episode" },
            { id: 3, title: "Trailer", path: "/media_management/trailer" }
        ]
    },
    {
        id: 2,
        title: "Vip",
        icon: <FaStar />,
        items: [
            { id: 1, title: "Package", path: "/vip/package" },
            { id: 2, title: "Feature", path: "/vip/feature" },
            { id: 3, title: "Plans", path: "/vip/plans" }
        ]
    },
    {
        id: 3,
        title: "Cast & Crew",
        icon: <FaUserFriends />,
        items: [
            { id: 1, title: "Author", path: "/cast_crew/author" },
            { id: 2, title: "Character", path: "/cast_crew/character" },
            { id: 3, title: "Actor", path: "/cast_crew/actor" }
        ]
    },
    {
        id: 4,
        title: "Engagement Pages",
        icon: <FaComments />,
        items: [
            { id: 1, title: "Like", path: "/engagement_pages/like" },
            { id: 2, title: "Watchlist", path: "/engagement_pages/watchlist" },
            { id: 3, title: "Comment", path: "/engagement_pages/comment" }
        ]
    }
];

export const CLOUD_NAME = "dfksqzury" ;
export const UPLOAD_PRESET = "Cinestream";