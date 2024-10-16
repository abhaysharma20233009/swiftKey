<div className="para" style={{ fontSize: '24px', marginTop: '10px', whiteSpace: 'pre-wrap' }}>
    {words.map((word, index) => (
        <span
            key={index}
            style={{
                padding: '0 5px',
                color: index === currentWordIndex ? 'blue' : 'white',
                textDecoration: index < currentWordIndex ? 'line-through' : 'none',
            }}
        >
            {word}
        </span>
    ))}
</div>
