interface StoryLane {
    title: string
    embedUrl: string
    description?: string
}

const StoryLane = ({ storylane }: { storylane: StoryLane }) => {
    return (
        <div>
            <iframe
                src={storylane.embedUrl}
                width="100%"
                height="500"
                allowFullScreen
                style={{ border: 'none' }}
            ></iframe>
        </div>
    )
}

export default StoryLane;
