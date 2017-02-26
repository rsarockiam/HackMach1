angular.module('vzMach')
    .factory('vzService', ['$http', '$q', '$localStorage', function ($http, $q, localStorage) {

        var zipcode = "";
        return {
            getRecommendPlans: function (zipcode) {
                var deferred = $q.defer();
                $http.get('/WebApi/GetRecommendPlans?zipcode=' + zipcode)
                   .success(function (data) {
                       deferred.resolve(data);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
            },
            getIP: function () {
                var deferred = $q.defer();
                $http.get('http://ipinfo.io')
                   .success(function (data) {
                       deferred.resolve(data);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
            },
            getStateCode: function (state)
            {
                if (state == "Texas")
                {
                    return 'TX';
                }
                if (state == "Pennsylvania")
                {
                    return 'PA';
                }
                if (state == "Virginia") {
                    return 'VA';
                }
                if (state == "Maryland") {
                    return 'MA';
                }
                if (state == "Newyork") {
                    return 'NY';
                }
                if (state == "Delaware") {
                    return 'DE';
                }
                if (state == "Newjersey") {
                    return 'NJ';
                }
                if (state == 'Massachusetts') {
                    return "MA";
                }
            },
            setZipcode: function (zip) {
                localStorage.zipcode = zip;
            },
            setState: function (State) {
                localStorage.state= State;
            },
            getZipcode: function () {
                return localStorage.zipcode;
            },
            getState: function () {
                return localStorage.state;
            },
            getZipDetails: function (zipcode) {
                var deferred = $q.defer();
                $http.get("http://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&sensor=true")
                   .success(function (data) {
                       var result = {};
                       result.city = data.results[0].address_components[1].short_name;
                       result.state = data.results[0].address_components[3].short_name;
                       deferred.resolve(result);
                   })
                   .error(function (err) {
                       deferred.reject(err)
                   });
                return deferred.promise;
        }
    //        var data = $.param({
    //        fName: $scope.firstName,
    //        lName: $scope.lastName
    //});
        
    //var config = {
    //    headers : {
    //        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    //    }
    //}

    //$http.post('/ServerRequest/PostDataResponse', data, config)
    //.success(function (data, status, headers, config) {
    //   
    //})
    //.error(function (data, status, header, config) {
    //   
    //});

        }

           

        
    }]);