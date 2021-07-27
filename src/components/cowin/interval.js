const [isLoading, setLoading] = useState(true);
const MINUTE_MS = 100000;
useEffect(() => {
    const interval = setInterval(() => {
        axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
        .then((res) => {
            setStateData(res.data.states)
        })
        setLoading(false);
    }, [MINUTE_MS]);

    return () => {
        clearInterval(interval);
    }

}, [])

 if (isLoading) {
        return <div>Loading...</div>;
}

