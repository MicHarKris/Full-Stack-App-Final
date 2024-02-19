const UpdateCourse = () => {

    return (

        <div className="wrap">


            <h2>Course Detail</h2>

            <form>

                <div className="main--flex">
                    
                        <div>
    
                            <h3 className="course--detail--title">Course</h3>
    
                            <h4 className="course--name">Build a Basic Bookcase</h4>
    
                            <p>By Joe Smith</p>
    
                            <p>Build a simple bookcase with minimal tools and experience.</p>
    
                        </div>
    
                        <div>
    
                            <h3 className="course--detail--title">Estimated Time</h3>
    
                            <p>14 hours</p>
    
                            <h3 className="course--detail--title">Materials Needed</h3>
    
                            <ul className="course--detail--list">
    
                                <li>1/2" birch plywood</li>
    
                                <li>1 1/4" brad nails</li>
    
                                <li>Sandpaper</li>
    
                                <li>Wood Glue</li>
    
                            </ul>
    
                        </div>

                </div>

            </form>

        </div>

    );

}

export default UpdateCourse;