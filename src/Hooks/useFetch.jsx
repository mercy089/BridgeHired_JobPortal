import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (callback, options = {}) => {
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null); // Set initial loading to false

    const { session } = useSession();

    const fetchFunction = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const supabaseAccessToken = await session.getToken({
                template: "supabase",
            });
            const response = await callback(supabaseAccessToken, options, ...args);
            setData(response);
            setError(null);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchFunction };
};

export default useFetch;
