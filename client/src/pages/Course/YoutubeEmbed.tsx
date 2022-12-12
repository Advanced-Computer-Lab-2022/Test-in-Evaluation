import React from "react";

const YoutubeEmbed: React.FC<{ url: string; style?: any }> = ({
    url,
    style,
}) => {
    return (
        <>
            <iframe
                src={url}
                style={style}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen={true}
                title="video"
            />
        </>
    );
};

export default YoutubeEmbed;
